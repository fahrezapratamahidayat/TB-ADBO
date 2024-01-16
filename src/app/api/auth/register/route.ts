import { RegisterUser } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const result = await RegisterUser(req);
  return NextResponse.json(
    { status: result.statusCode, message: result.message },
    { status: result.statusCode }
  );
}