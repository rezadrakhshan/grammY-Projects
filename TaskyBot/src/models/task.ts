import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userID: { type: Number, required: true },
    title: String,
    description: { type: String, default: '' },
    isDone: { type: Boolean, default: false },
    due: { type: String, required: true },
  },
  { timestamps: true },
);

export const Task = mongoose.model('Task', taskSchema);
