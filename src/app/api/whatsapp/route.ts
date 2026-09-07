import { NextResponse } from "next/server";
import { getGlobalSettings } from "@/lib/contentful/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text");

    const settings = await getGlobalSettings();
    const number = settings.whatsappNumber;

    if (!number) {
      console.error("WhatsApp number not found in global settings");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const waUrl = new URL(`https://wa.me/${number}`);
    if (text) {
      waUrl.searchParams.set("text", text);
    }

    return NextResponse.redirect(waUrl.toString());
  } catch (error) {
    console.error("Error redirecting to WhatsApp:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
