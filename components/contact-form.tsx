"use client";

import { useMemo, useState } from "react";

type ContactFormStrings = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
  sending: string;
  sentTitle: string;
  sentBody: string;
  error: string;
};

type ContactFormProps = {
  locale: "fr" | "en" | "ar";
};

function getStrings(locale: ContactFormProps["locale"]): ContactFormStrings {
  if (locale === "ar") {
    return {
      name: "الاسم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      submit: "إرسال",
      sending: "جارٍ الإرسال…",
      sentTitle: "تم الإرسال",
      sentBody: "شكرًا لك. سنعود إليك في أقرب وقت.",
      error: "تعذر الإرسال. حاول مرة أخرى.",
    };
  }

  if (locale === "en") {
    return {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      submit: "Send",
      sending: "Sending…",
      sentTitle: "Sent",
      sentBody: "Thank you. We’ll get back to you shortly.",
      error: "Could not send. Please try again.",
    };
  }

  return {
    name: "Nom",
    email: "E-mail",
    subject: "Objet",
    message: "Message",
    submit: "Envoyer",
    sending: "Envoi…",
    sentTitle: "Message envoyé",
    sentBody: "Merci. Nous vous recontacterons rapidement.",
    error: "Impossible d’envoyer. Réessaie.",
  };
}

export function ContactForm({ locale }: ContactFormProps) {
  const strings = useMemo(() => getStrings(locale), [locale]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative overflow-hidden border border-[var(--border-subtle)] bg-white shadow-[0_20px_80px_rgba(16,35,58,0.08)]">
      <div
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#0f1f34_1px,transparent_1px),linear-gradient(to_bottom,#0f1f34_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center justify-between gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b68d49]">MCT</p>
          <div className="h-px flex-1 bg-[#c9a15d]/35" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0f1f34]/70">
            {strings.submit}
          </p>
        </div>

        {status === "sent" ? (
          <div className="mt-8">
            <p className="text-2xl font-semibold tracking-tight text-[#10233a]">{strings.sentTitle}</p>
            <p className="mt-3 leading-7 text-[#5b6979]">{strings.sentBody}</p>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label={strings.name}>
                <input
                  name="name"
                  required
                  className="h-12 w-full border border-[var(--border-subtle)] bg-white px-4 text-[#10233a] outline-none transition focus:border-[#c9a15d]"
                />
              </Field>
              <Field label={strings.email}>
                <input
                  name="email"
                  type="email"
                  required
                  className="h-12 w-full border border-[var(--border-subtle)] bg-white px-4 text-[#10233a] outline-none transition focus:border-[#c9a15d]"
                />
              </Field>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label={strings.subject}>
                <input
                  name="subject"
                  required
                  className="h-12 w-full border border-[var(--border-subtle)] bg-white px-4 text-[#10233a] outline-none transition focus:border-[#c9a15d]"
                />
              </Field>
              <div className="hidden md:block" aria-hidden />
            </div>
            <Field label={strings.message}>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full resize-none border border-[var(--border-subtle)] bg-white px-4 py-3 text-[#10233a] outline-none transition focus:border-[#c9a15d]"
              />
            </Field>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-w-[12rem] items-center justify-center bg-[#0f1f34] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b1728] disabled:opacity-60"
              >
                {status === "sending" ? strings.sending : strings.submit}
              </button>
              {status === "error" ? <p className="text-sm font-medium text-red-600">{strings.error}</p> : null}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f1f34]/70">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

