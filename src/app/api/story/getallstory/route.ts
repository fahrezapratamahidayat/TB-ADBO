import { getStories } from "@/lib/firebase/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const story = await getStories();
    return NextResponse.json(story, { status: 200 });
}