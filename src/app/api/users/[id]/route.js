import { NextResponse } from "next/server";
import connectToDatabase from "@/config/mongodb";
import User from "@/models/User";

// GET: Single user by ID
export async function GET(req, { params }) {
  try {
    const { id } = await params; // Important: await params in Next.js 16
    await connectToDatabase();

    // .select('-password') ensures security
    const user = await User.findById(id).select("-password").lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  }
}

// PUT: Update user details
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.username = body.username ?? user.username;
    user.email = body.email ?? user.email;
    user.role = body.role ?? user.role;

    if (body.password) {
      user.password = body.password;
    }

    await user.save();

    const updatedUser = await User.findById(id).select("-password").lean();

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json(
        { error: "Email address is already in use" },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// DELETE: Remove a user
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
