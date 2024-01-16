import { getStoryId } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("storyId");
  const results = await getStoryId(id as string);
  return NextResponse.json(results);
}
