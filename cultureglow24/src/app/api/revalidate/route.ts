import { NextRequest, NextResponse } from "next/server";
import { invalidateCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tag, path } = body;

    if (tag) {
      invalidateCache(tag);
    } else {
      invalidateCache();
    }

    return NextResponse.json({
      revalidated: true,
      message: "Cache invalidated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
