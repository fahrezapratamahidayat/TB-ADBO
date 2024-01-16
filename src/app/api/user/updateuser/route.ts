import { updateUser } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");
  const req = await request.json();
  const result = await updateUser(userId as string, req);
  if(userId){
    return NextResponse.json({ status: result.status, message: result.message });
  }
}
