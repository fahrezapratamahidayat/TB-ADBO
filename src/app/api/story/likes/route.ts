import { postLike } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("userId");
    const storyId = searchParams.get("storyId");
    const result = await postLike(storyId as string, id as string);
    return NextResponse.json(result, { status: result.statusCode });
}