import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

router.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

router.post('/api/users/', async (request, response) => {
  response.status(201).json(await User.create(request.body));
});

router.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});

router.post('/api/teams/', async (request, response) => {
  response.status(201).json(await Team.create(request.body));
});

router.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').lean());
});

router.post('/api/activities/', async (request, response) => {
  response.status(201).json(await Activity.create(request.body));
});

router.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user').sort({ points: -1 }).lean());
});

router.post('/api/leaderboard/', async (request, response) => {
  response.status(201).json(await Leaderboard.create(request.body));
});

router.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

router.post('/api/workouts/', async (request, response) => {
  response.status(201).json(await Workout.create(request.body));
});

export default router;
