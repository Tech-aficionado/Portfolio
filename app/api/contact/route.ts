import { NextResponse } from "next/server";
import { notificationEmail, receiptEmail } from "./emails";

const HITS = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = HITS.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    HITS.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO = "shivansh.goela12@gmail.com";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "").trim();

  if (honeypot) return NextResponse.json({ ok: true });

  if (name.length < 2)
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  if (message.length < 10)
    return NextResponse.json(
      { ok: false, error: "Message must be at least 10 characters." },
      { status: 400 }
    );

  const key = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Shivansh Goel";
  const to = process.env.CONTACT_TO_EMAIL || TO;

  if (!key || !senderEmail) {
    return NextResponse.json({ ok: true, fallback: true });
  }

  const sendBrevo = (payload: Record<string, unknown>) =>
    fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": key,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

  try {
    const notify = await sendBrevo({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to, name: senderName }],
      replyTo: { email, name },
      subject: `New message from ${name}`,
      htmlContent: notificationEmail({ name, email, message }),
    });

    if (!notify.ok) {
      return NextResponse.json(
        { ok: false, error: "Couldn't send right now. Try emailing directly." },
        { status: 502 }
      );
    }

    try {
      await sendBrevo({
        sender: { name: senderName, email: senderEmail },
        to: [{ email, name }],
        subject: "Thanks for reaching out 👋",
        htmlContent: receiptEmail({ name, message }),
      });
    } catch {}

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Couldn't send right now. Try emailing directly." },
      { status: 502 }
    );
  }
}
