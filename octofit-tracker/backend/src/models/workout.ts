import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
