import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  date: { type: String, required: true },
  dateTimeStamps: { type: Number, required: true },
});

export const Reminder = mongoose.model('Reminder', reminderSchema);
