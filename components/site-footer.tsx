import { contact, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">{site.name}</p>
            <p className="mt-1 max-w-sm text-sm text-zinc-400">{site.legalName}</p>
          </div>
          <div className="text-sm">
            <p className="font-medium text-white">Coordonnées</p>
            <p className="mt-2 text-zinc-400">{contact.addressLines.join(", ")}</p>
            <div className="mt-2 flex flex-col gap-1">
              {contact.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-blue-200">
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} {site.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
