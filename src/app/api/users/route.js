import { NextResponse } from "next/server";
import connectToDatabase from "@/config/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newUser = await User.create(body);
    // Don't return the password in the response
    const { password, ...userWithoutPassword } = newUser._doc;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}).select("-password").lean();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
