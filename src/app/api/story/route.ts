import { uploadStory } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const req = await request.json();
    const result = await uploadStory(req);
    return NextResponse.json(
        { status: result.status, message: result.message },
        { status: result.statusCode }
    );
}