import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

router.get('/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

router.post('/users/', async (request, response) => {
  response.status(201).json(await User.create(request.body));
});

router.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});

router.post('/teams/', async (request, response) => {
  response.status(201).json(await Team.create(request.body));
});

router.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').lean());
});

router.post('/activities/', async (request, response) => {
  response.status(201).json(await Activity.create(request.body));
});

router.get('/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user').sort({ points: -1 }).lean());
});

router.post('/leaderboard/', async (request, response) => {
  response.status(201).json(await Leaderboard.create(request.body));
});

router.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

router.post('/workouts/', async (request, response) => {
  response.status(201).json(await Workout.create(request.body));
});

export default router;
