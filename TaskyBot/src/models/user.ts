import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userID: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
});

export const User = mongoose.model('User', userSchema);
