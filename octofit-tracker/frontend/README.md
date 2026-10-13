# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, React Router, and Bootstrap to show
users, teams, activities, leaderboard entries, and workouts from the API.

## API configuration

For a frontend running in GitHub Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads this variable when the dev server starts; restart the server after
changing `.env.local`. If it is unset, the app detects the Codespaces name from
the forwarded frontend hostname when possible. If neither source provides a
Codespaces name (for example, local development), it uses
`http://localhost:8000`. The API allows browser requests from the matching
Codespaces frontend and from localhost port 5173.

Resource pages support array responses and paginated responses containing a
`results`, `data`, or `items` array.
