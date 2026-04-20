import mongoose from "mongoose";

const VisitPlanSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links to your User model
      required: true,
    },
    plan_name: { type: String, required: true },
    date: { type: Date, required: true },
    selected_places: [
      {
        place_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Place", // Links to your Place model
        },
        order: { type: Number }, // To store the sequence of the visit
      },
    ],
  },
  { timestamps: true },
);

const VisitPlan =
  mongoose.models.VisitPlan || mongoose.model("VisitPlan", VisitPlanSchema);
export default VisitPlan;
