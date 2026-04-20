import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["tourist", "admin"], default: "tourist" },
  },
  { timestamps: true },
);

// Hash password before saving to database
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

if (mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
