import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const userData = [
      { username: 'maya.runner', email: 'maya@example.com' },
      { username: 'liam.lifts', email: 'liam@example.com' },
      { username: 'ava.moves', email: 'ava@example.com' },
    ];
    const users = await Promise.all(
      userData.map(({ email, ...user }) =>
        User.findOneAndUpdate({ email }, user, { upsert: true, new: true, runValidators: true }),
      ),
    );
    const [maya, liam, ava] = users;

    const teamData = [
      { name: 'Trail Blazers', members: [maya._id, ava._id] },
      { name: 'Strength Squad', members: [liam._id, ava._id] },
    ];
    await Promise.all(
      teamData.map(({ name, ...team }) =>
        Team.findOneAndUpdate({ name }, team, { upsert: true, new: true, runValidators: true }),
      ),
    );

    const activities = [
      { user: maya._id, type: 'Running', duration: 38, date: new Date('2026-10-10T07:30:00.000Z') },
      { user: liam._id, type: 'Strength training', duration: 52, date: new Date('2026-10-10T17:00:00.000Z') },
      { user: ava._id, type: 'Cycling', duration: 45, date: new Date('2026-10-11T08:15:00.000Z') },
    ];
    await Promise.all(
      activities.map(({ user, type, date, ...activity }) =>
        Activity.findOneAndUpdate(
          { user, type, date },
          activity,
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );

    const leaderboardEntries = [
      { user: maya._id, points: 420 },
      { user: ava._id, points: 365 },
      { user: liam._id, points: 310 },
    ];
    await Promise.all(
      leaderboardEntries.map(({ user, points }) =>
        Leaderboard.findOneAndUpdate(
          { user },
          { points },
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );

    const workouts = [
      {
        name: 'Easy Endurance Run',
        description: 'A steady-paced run to build aerobic fitness and recovery.',
        difficulty: 'Beginner',
      },
      {
        name: 'Full-Body Strength',
        description: 'A balanced session of foundational pushing, pulling, and leg movements.',
        difficulty: 'Intermediate',
      },
      {
        name: 'Tempo Ride',
        description: 'A cycling session with sustained tempo intervals and easy recovery periods.',
        difficulty: 'Intermediate',
      },
    ];
    await Promise.all(
      workouts.map(({ name, ...workout }) =>
        Workout.findOneAndUpdate({ name }, workout, { upsert: true, new: true, runValidators: true }),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
