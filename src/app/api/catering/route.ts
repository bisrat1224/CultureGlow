import { NextResponse } from "next/server";
import { createRateLimit, getClientIP } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { Resend } from "resend";



interface CateringPayload {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  guestCount?: string;
  message: string;
}

const isRateLimited = createRateLimit({ maxRequests: 5, windowMs: 60 * 1000 });

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validate(body: Partial<CateringPayload>): string | null {
  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    return "Please enter your name.";
  }
  if (body.name.length > 100) {
    return "Name is too long (max 100 characters).";
  }
  if (!body.email || typeof body.email !== "string" || !EMAIL_RE.test(body.email)) {
    return "Please enter a valid email address.";
  }
  if (!body.eventType || typeof body.eventType !== "string" || body.eventType.trim().length < 2) {
    return "Please select or describe your event type.";
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
  let body: Partial<CateringPayload>;

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
  const recipient = process.env.CATERING_FORM_RECIPIENT_EMAIL;

  if (!apiKey || !recipient) {
    logger.error("[/api/catering] Missing RESEND_API_KEY or CATERING_FORM_RECIPIENT_EMAIL env var.");
    return NextResponse.json(
      { error: "Form is not fully configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const { name, email, phone, eventType, eventDate, guestCount, message } =
    body as CateringPayload;
  const resend = new Resend(apiKey);

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Event type: ${eventType}`,
    eventDate ? `Event date: ${eventDate}` : null,
    guestCount ? `Guest count: ${guestCount}` : null,
    "",
    "Message:",
    message,
  ].filter(Boolean);

  try {
    await resend.emails.send({
      from: "CultureGlow24 <hello@cultureglow24.com>", // TODO: Verify domain with Resend before going live
      to: recipient,
      replyTo: email,
      subject: `New catering enquiry from ${name}`,
      text: lines.join("\n"),
    });
  } catch (err) {
    logger.error("[/api/catering] Resend send failed:", err);
    return NextResponse.json(
      { error: "Could not send your enquiry right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}