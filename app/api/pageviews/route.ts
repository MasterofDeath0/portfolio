import { NextResponse } from "next/server";

let cached: { views: string; ts: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET() {
  const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
  const API_KEY = process.env.UMAMI_API_KEY;

  if (!WEBSITE_ID || !API_KEY) {
    return NextResponse.json({
      views: null,
      error: "Not configured",
    });
  }

  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json({ views: cached.views });
  }

  try {
    const response = await fetch(
      `https://api.umami.is/v1/websites/${WEBSITE_ID}/stats`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({
        views: null,
        error: text,
      });
    }

    const data = await response.json();

    const views = String(data.pageviews?.value ?? 0);

    cached = {
      views,
      ts: Date.now(),
    };

    return NextResponse.json({ views });
  } catch (error) {
    return NextResponse.json({
      views: null,
      error: "Failed to fetch Umami stats",
    });
  }
}
