import { NextResponse } from "next/server";
import connectToDatabase from "@/config/mongodb";
import VisitPlan from "@/models/VisitPlan";
import User from "@/models/User";
import Place from "@/models/Place";

// POST: Create a new visit plan
export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newPlan = await VisitPlan.create(body);
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create plan" },
      { status: 400 },
    );
  }
}

// GET: Get all plans (with details populated)
export async function GET() {
  try {
    await connectToDatabase();

    const plans = await VisitPlan.find({})
      .populate({
        path: "user_id",
        model: User, // This uses the 'User' import from line 4
        select: "username email",
      })
      .populate({
        path: "selected_places.place_id",
        model: Place, // This uses the 'Place' import from line 5
      })
      .lean();

    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch plans", details: error.message },
      { status: 500 },
    );
  }
}
