import { getBlogPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await getBlogPosts();
  // Don't send full content via API
  const stripped = posts.map(({ content: _c, ...rest }) => rest);
  return NextResponse.json(stripped);
}
