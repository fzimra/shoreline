import { NextResponse } from "next/server";
import connectToDatabase from "@/config/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { setAuthCookie } from "@/utils/auth-session";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 2. Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 3. Success! Return user data (but hide the password)
    const { password: _, ...userData } = user._doc;
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: userData,
      },
      { status: 200 },
    );

    setAuthCookie(response, {
      id: userData._id.toString(),
      username: userData.username,
      email: userData.email,
      role: userData.role,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Server error during login" },
      { status: 500 },
    );
  }
}
