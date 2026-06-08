import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });
  return res.json();
}

export async function GET() {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      return NextResponse.json({ isPlaying: false, title: "Not configured", artist: "" });
    }

    const { access_token } = await getAccessToken();

    // Try currently playing first
    const currentRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 30 },
    });

    if (currentRes.status === 200) {
      const data = await currentRes.json();
      if (data?.item) {
        return NextResponse.json({
          isPlaying: data.is_playing,
          title: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
          albumArt: data.item.album.images[0]?.url,
          songUrl: data.item.external_urls.spotify,
        });
      }
    }

    // Fall back to recently played
    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${access_token}` },
        next: { revalidate: 30 },
      }
    );
    const recent = await recentRes.json();
    const track = recent?.items?.[0]?.track;
    if (track) {
      return NextResponse.json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(", "),
        albumArt: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
      });
    }

return NextResponse.json({ isPlaying: false, title: "", artist: "", albumArt: "", songUrl: "", }); } 
catch { return NextResponse.json({ isPlaying: false, title: "", artist: "", albumArt: "", songUrl: "", }); } 
}
