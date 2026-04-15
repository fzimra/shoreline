import { NextResponse } from "next/server";
import Place from "@/models/Place";
import connectToDatabase from "@/config/mongodb";

// GET: Single place by ID
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const place = await Place.findById(id).lean();

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    return NextResponse.json(place, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }
}

// PUT: Update a place
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();

    const updatedPlace = await Place.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlace) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPlace, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// DELETE: Remove a place
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deletedPlace = await Place.findByIdAndDelete(id);

    if (!deletedPlace) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Place successfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Delete operation failed" },
      { status: 400 },
    );
  }
}
