import { site, type LocalizedContent } from "@/lib/content";

type SiteFooterProps = Pick<LocalizedContent, "contact" | "footer">;

export function SiteFooter({ contact, footer }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-white text-[#4d5a6b]">
      <div className="w-full px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-t border-[#c9a15d]/40 pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-[#10233a]">{site.name}</p>
            <p className="mt-1 max-w-sm text-sm text-[#c9a15d]">{site.legalName}</p>
          </div>
          <div className="text-sm">
            <p className="font-medium text-[#10233a]">{footer.contactHeading}</p>
            <p className="mt-2 text-[#5b6979]">{contact.addressLines.join(", ")}</p>
            <div className="mt-2 flex flex-col gap-1">
              {contact.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="transition hover:text-[#c9a15d]">
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-[#7d8896]">
          © {new Date().getFullYear()} {site.name}. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
