#!/usr/bin/env node
/**
 * Optimise les images dans public/images/brands/** (photos boutiques).
 * - correction d’orientation EXIF
 * - redimensionnement max 2560px
 * - netteté légère
 * - réencodage JPEG qualité élevée
 */
import sharp from "sharp";
import { mkdir, readdir, rename, stat, unlink } from "node:fs/promises";
import { join, extname, relative } from "node:path";

const ROOT_DIR = "public/images/brands";
const BACKUP_DIR = "public/images/brands/.originals";
const MAX_WIDTH = 2560;
const JPEG_QUALITY = 92;
const SKIP_DIRS = new Set([".originals"]);

async function ensureBackup(srcPath) {
  const rel = relative(ROOT_DIR, srcPath);
  const backupPath = join(BACKUP_DIR, rel);
  await mkdir(join(backupPath, ".."), { recursive: true });
  try {
    await stat(backupPath);
  } catch {
    await mkdir(join(backupPath, ".."), { recursive: true });
    await sharp(srcPath, { failOn: "none" }).toFile(backupPath);
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      files.push(...(await walk(join(dir, entry.name))));
      continue;
    }
    if (!entry.isFile()) continue;
    if (!/\.(jpe?g|png|webp)$/i.test(entry.name)) continue;
    files.push(join(dir, entry.name));
  }
  return files;
}

async function optimizeOne(filePath) {
  const ext = extname(filePath).toLowerCase();
  const tmpPath = `${filePath}.opt`;

  await ensureBackup(filePath);

  let pipeline = sharp(filePath, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  const width = meta.width ?? 0;

  if (width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, {
      fit: "inside",
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    });
  }

  if ((meta.width ?? 0) >= 700) {
    pipeline = pipeline.sharpen({ sigma: 0.7, m1: 0.55, m2: 0.28 });
  } else {
    pipeline = pipeline.sharpen({ sigma: 0.5, m1: 0.45, m2: 0.2 });
  }

  if (ext === ".png" && meta.hasAlpha) {
    await pipeline.png({ compressionLevel: 9, quality: 95, effort: 10, palette: false }).toFile(tmpPath);
    await unlink(filePath).catch(() => {});
    await rename(tmpPath, filePath);
    return;
  }

  // Normalise tout en JPEG (sauf PNG alpha)
  const outPath = filePath.replace(/\.(png|webp)$/i, ".jpg");
  await pipeline
    .jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
      chromaSubsampling: "4:4:4",
    })
    .toFile(tmpPath.replace(/\.(png|webp|jpe?g)$/i, ".jpg"));

  await unlink(filePath).catch(() => {});
  await rename(tmpPath.replace(/\.(png|webp|jpe?g)$/i, ".jpg"), outPath);
}

async function main() {
  const files = await walk(ROOT_DIR);
  if (files.length === 0) {
    console.log("Aucune image trouvée.");
    return;
  }

  console.log(`Optimisation de ${files.length} images (brands)…`);
  for (const file of files) {
    await optimizeOne(file);
  }
  console.log("Terminé.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

