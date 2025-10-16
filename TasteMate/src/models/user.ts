import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  telegramID: { type: String, required: true, unique: true },
  phone: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
});

export const User = mongoose.model("User", userSchema);
