import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config/api.js'
import { readCollection } from './readCollection.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/leaderboard/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then(readCollection)
      .then(setEntries)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id}>
            {entry.user?.username ?? 'Unknown user'} · {entry.points} points
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
