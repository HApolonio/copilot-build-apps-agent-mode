import { useEffect, useState } from 'react'
import { apiBaseUrl } from './config/api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/teams/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then(setTeams)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      <ul className="list-group">
        {teams.map((team) => <li className="list-group-item" key={team._id}>{team.name} · {team.members.length} members</li>)}
      </ul>
    </section>
  )
}

export default Teams
