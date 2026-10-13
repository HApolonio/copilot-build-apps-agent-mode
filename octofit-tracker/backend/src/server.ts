import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const port = Number(process.env.PORT ?? 8000);

const app = express();

app.use(express.json());
app.use(apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/config', (_request, response) => {
  response.json({ baseUrl: apiBaseUrl });
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  if (error instanceof Error && error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
    return;
  }
  response.status(500).json({ error: 'Internal server error' });
});

async function startServer() {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});
