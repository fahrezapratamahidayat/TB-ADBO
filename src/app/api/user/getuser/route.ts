import { getUserId } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const result = await getUserId(id as string);
    return NextResponse.json(result, { status: result.statusCode });
}