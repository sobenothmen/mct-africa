#!/usr/bin/env node
/**
 * Réencode et normalise les images du site :
 * - correction d’orientation EXIF
 * - redimensionnement raisonnable (max 2560 px)
 * - netteté légère + qualité JPEG élevée
 * - upscaling modéré des visuels de marque trop petits
 */
import sharp from "sharp";
import { copyFile, mkdir, readdir, rename, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";

const IMAGES_DIR = "public/images";
const BACKUP_DIR = "public/images/.originals";
const MAX_WIDTH = 2560;
const MIN_BRAND_WIDTH = 1600;
const JPEG_QUALITY = 92;

const BRAND_FILES = new Set([
  "celio.jpg",
  "beauty-success.jpg",
  "parfois.jpg",
  "zippy.jpg",
  "women-secret.png",
]);

const SKIP = new Set([".originals", ".DS_Store"]);

async function ensureBackup(filename, inputPath) {
  await mkdir(BACKUP_DIR, { recursive: true });
  const backupPath = join(BACKUP_DIR, filename);
  try {
    await stat(backupPath);
  } catch {
    await copyFile(inputPath, backupPath);
  }
}

async function optimizeFile(filename) {
  const inputPath = join(IMAGES_DIR, filename);
  const ext = extname(filename).toLowerCase();
  const tmpPath = `${inputPath}.opt`;

  await ensureBackup(filename, inputPath);

  let pipeline = sharp(inputPath, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  let width = meta.width ?? 0;

  if (width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, {
      fit: "inside",
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    });
    width = MAX_WIDTH;
  } else if (BRAND_FILES.has(filename) && width > 0 && width < MIN_BRAND_WIDTH) {
    pipeline = pipeline.resize(MIN_BRAND_WIDTH, null, {
      fit: "inside",
      kernel: sharp.kernel.lanczos3,
    });
    pipeline = pipeline.sharpen({ sigma: 1, m1: 0.6, m2: 0.35 });
  } else if (width >= 600) {
    pipeline = pipeline.sharpen({ sigma: 0.6, m1: 0.5, m2: 0.25 });
  }

  if (ext === ".png") {
    if (meta.hasAlpha) {
      await pipeline
        .png({ compressionLevel: 9, quality: 95, effort: 10, palette: false })
        .toFile(tmpPath);
    } else {
      await pipeline
        .jpeg({
          quality: JPEG_QUALITY,
          mozjpeg: true,
          chromaSubsampling: "4:4:4",
        })
        .toFile(tmpPath.replace(/\.png$/i, ".jpg"));
      const jpgName = filename.replace(/\.png$/i, ".jpg");
      const jpgPath = join(IMAGES_DIR, jpgName);
      await unlink(inputPath).catch(() => {});
      await rename(tmpPath.replace(/\.png$/i, ".jpg"), jpgPath);
      console.log(`  → ${jpgName} (converti depuis PNG)`);
      return jpgName;
    }
  } else {
    await pipeline
      .jpeg({
        quality: JPEG_QUALITY,
        mozjpeg: true,
        chromaSubsampling: "4:4:4",
      })
      .toFile(tmpPath);
  }

  await unlink(inputPath).catch(() => {});
  await rename(tmpPath, inputPath);
  console.log(`  ✓ ${filename}`);
  return filename;
}

async function main() {
  const entries = await readdir(IMAGES_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && !SKIP.has(e.name))
    .map((e) => e.name)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name));

  console.log(`Optimisation de ${files.length} images…\n`);

  const renames = {};
  for (const file of files) {
    const result = await optimizeFile(file);
    if (result !== file) renames[file] = result;
  }

  if (Object.keys(renames).length > 0) {
    console.log("\nFichiers renommés :", renames);
    console.log("Mettez à jour lib/content.ts si nécessaire (women-secret).");
  }

  console.log("\nTerminé. Originaux sauvegardés dans public/images/.originals/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
