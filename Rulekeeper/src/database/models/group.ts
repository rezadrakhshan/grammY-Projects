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
      forwardBlock: { type: Boolean, default: false },
      badWords: { type: [String] },
      gifBlock: { type: Boolean, default: false },
      editBlock: { type: Boolean, default: false },
      videoBlock: { type: Boolean, default: false },
      pictureBlock: { type: Boolean, default: false },
      musicBlock: { type: Boolean, default: false },
      stickerBlock: { type: Boolean, default: false },
      locationBlock: { type: Boolean, default: false },
      voiceBlock: { type: Boolean, default: false },
      pollBlock: { type: Boolean, default: false },
    },
    AIAsistantt: { type: Boolean, default: false },
    adminIDs: { type: [Number] },
    maxWarningCount: { type: Number, default: 3 },
  },
  { timestamps: true },
);

export const Group = mongoose.model("group", groupSchema);
