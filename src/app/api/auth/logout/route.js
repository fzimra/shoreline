import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/utils/auth-session";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 },
  );

  clearAuthCookie(response);

  return response;
}
