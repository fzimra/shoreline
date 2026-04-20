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

    // Prevent password updates through this route (use a dedicated route for that)
    delete body.password;

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
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
