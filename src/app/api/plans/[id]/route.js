import { NextResponse } from "next/server";
import connectToDatabase from "@/config/mongodb";
import VisitPlan from "@/models/VisitPlan";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const plan = await VisitPlan.findById(id).populate(
      "selected_places.place_id",
    );
    if (!plan)
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();
    await connectToDatabase();
    const updatedPlan = await VisitPlan.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(updatedPlan);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    await VisitPlan.findByIdAndDelete(id);
    return NextResponse.json({ message: "Plan deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
