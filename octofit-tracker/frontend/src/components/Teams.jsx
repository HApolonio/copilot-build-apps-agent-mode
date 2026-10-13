import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config/api.js'
import { readCollection } from './readCollection.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/teams/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then(readCollection)
      .then(setTeams)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id}>
            {team.name} · {Array.isArray(team.members) ? team.members.length : 0} members
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
