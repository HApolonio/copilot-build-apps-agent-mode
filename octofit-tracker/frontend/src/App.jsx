import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './Activities.jsx'
import Leaderboard from './Leaderboard.jsx'
import Teams from './Teams.jsx'
import Users from './Users.jsx'
import Workouts from './Workouts.jsx'

function App() {
  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <nav className="nav nav-pills flex-wrap gap-2" aria-label="Main navigation">
          <NavLink className="nav-link" to="/users">Users</NavLink>
          <NavLink className="nav-link" to="/teams">Teams</NavLink>
          <NavLink className="nav-link" to="/activities">Activities</NavLink>
          <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<p>Track activities, teams, and workouts.</p>} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  )
}

export default App
