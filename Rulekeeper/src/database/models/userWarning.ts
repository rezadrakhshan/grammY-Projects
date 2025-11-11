import mongoose from "mongoose";

const warningSchema = new mongoose.Schema(
  {
    chatID: { type: Number, required: true },
    userID: { type: Number, unique: true, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Warning = mongoose.model("Warning", warningSchema);
