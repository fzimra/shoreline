import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the place of interest."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description."],
    },
    category: [
      {
        type: String,
        enum: [
          "Religious",
          "Nature",
          "Heritage",
          "Cultural",
          "Historical",
          "Other",
        ],
      },
    ],
    location: {
      latitude: Number,
      longitude: Number,
      address: String,
    },
    opening_hours: {
      type: String,
      required: true,
    },
    travel_tips: {
      type: [String],
      default: [],
    },
    distance_km: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Place || mongoose.model("Place", PlaceSchema);
