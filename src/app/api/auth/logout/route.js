import { NextResponse } from "next/server";

export async function POST() {
  // If you use Cookies/JWT later, you would clear them here.
  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 },
  );
}
