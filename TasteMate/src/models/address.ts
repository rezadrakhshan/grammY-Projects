import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userID: { type: Number, required: true },
  address: { type: String, required: true },
});

export const Address = mongoose.model("Address", addressSchema);
