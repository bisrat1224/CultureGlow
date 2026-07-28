import { NextResponse } from "next/server";
import { createRateLimit, getClientIP } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { Resend } from "resend";



interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const isRateLimited = createRateLimit({ maxRequests: 5, windowMs: 60 * 1000 });

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    return "Please enter your name.";
  }
  if (body.name.length > 100) {
    return "Name is too long (max 100 characters).";
  }
  if (!body.email || typeof body.email !== "string" || !EMAIL_RE.test(body.email)) {
    return "Please enter a valid email address.";
  }
  if (!body.message || typeof body.message !== "string" || body.message.trim().length < 10) {
    return "Please enter a message (at least 10 characters).";
  }
  if (body.message.length > 5000) {
    return "Message is too long (max 5000 characters).";
  }
  return null;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const ip = getClientIP(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_FORM_RECIPIENT_EMAIL;

  if (!apiKey || !recipient) {
    logger.error("[/api/contact] Missing RESEND_API_KEY or CONTACT_FORM_RECIPIENT_EMAIL env var.");
    return NextResponse.json(
      { error: "Form is not fully configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const { name, email, message } = body as ContactPayload;
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      // NOTE: replace with a verified sending domain once one exists -
      // resend.dev's onboarding address is a placeholder for local/dev use.
      from: "CultureGlow24 <hello@cultureglow24.com>", // TODO: Verify domain with Resend before going live
      to: recipient,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
  } catch (err) {
    logger.error("[/api/contact] Resend send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
