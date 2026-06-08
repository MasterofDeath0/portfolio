\```ts
import { NextResponse } from "next/server";

let cached: { data: unknown; ts: number } | null = null;
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
    return NextResponse.json(cached.data);
  }

  try {
    const endAt = Date.now();
    const startAt = new Date("2024-01-01").getTime();

    const response = await fetch(
      `https://api.umami.is/v1/websites/${WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const data = await response.json();

    cached = {
      data,
      ts: Date.now(),
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      views: null,
      error: "Failed to fetch Umami stats",
    });
  }
}
```
