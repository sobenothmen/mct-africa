import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  let payload: ContactPayload | null = null;

  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim();
  const subject = String(payload?.subject ?? "").trim();
  const message = String(payload?.message ?? "").trim();

  if (!name || !email || !subject || !message || !isEmail(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // No external network here: keep it local (logs can be wired to email later).
  console.log("[contact]", {
    name,
    email,
    subject,
    messageLen: message.length,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

