import { NextResponse } from "next/server";
import connectToDatabase from "@/config/mongodb";
import Place from "@/models/Place";

// GET all places
export async function GET() {
  try {
    await connectToDatabase();
    const places = await Place.find({});
    return NextResponse.json(places, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch places" },
      { status: 500 },
    );
  }
}

// POST create a new place
export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newPlace = await Place.create(body);
    return NextResponse.json(newPlace, { status: 201 });
  } catch (error) {
    console.error("Error creating place:", error);
    return NextResponse.json(
      { error: "Failed to create place" },
      { status: 400 },
    );
  }
}
