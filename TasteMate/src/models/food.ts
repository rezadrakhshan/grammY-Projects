import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String, required: true },
  available: { type: Boolean, default: false },
});

export const Food = mongoose.model("Food", foodSchema);
