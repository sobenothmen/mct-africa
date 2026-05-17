import { site, type LocalizedContent } from "@/lib/content";

type SiteFooterProps = Pick<LocalizedContent, "contact" | "footer">;

export function SiteFooter({ contact, footer }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] text-[#4d5a6b]">
      <div className="w-full px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-10 border-t border-[#c9a15d]/35 pt-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xl font-semibold tracking-tight text-[#10233a]">{site.name}</p>
              <p className="mt-2 max-w-md text-sm leading-7 text-[#5b6979]">{site.legalName}</p>
              <div className="mt-6 h-px w-24 bg-[#c9a15d]/55" aria-hidden />
            </div>

            <div className="text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10233a]">
                {footer.contactHeading}
              </p>
              <p className="mt-3 text-[#5b6979]">{contact.addressLines.join(", ")}</p>
              <div className="mt-4 flex flex-col gap-2">
                {contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="font-medium text-[#10233a] transition hover:text-[#c9a15d]"
                  >
                    {p}
                  </a>
                ))}
                {contact.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="font-medium text-[#10233a] transition hover:text-[#c9a15d]"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-[#7d8896]">
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
