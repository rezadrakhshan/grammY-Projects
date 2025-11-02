import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userID: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String },
    warnings: { type: Number, default: 0 },
    isBanned: { type: Boolean, default: false },
    groups: { type: [Number] },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
