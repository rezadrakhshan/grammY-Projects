import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    chatID: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    rules: { type: String },
    welcomeMessage: { type: String },
    antiSpam: {
      enabled: { type: Boolean, default: false },
      floodLimit: { type: Number, default: 0 },
      linkBlock: { type: Boolean, default: false },
      badWords: { type: [String] },
    },
    adminIDs: { type: [Number] },
    maxWarningCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Group = mongoose.model("group", groupSchema);
