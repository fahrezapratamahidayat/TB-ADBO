import { postComment } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const storyId = searchParams.get("storyId");
    const req = await request.json();
    const results = await postComment(storyId as string, req);
    return NextResponse.json(results);
}