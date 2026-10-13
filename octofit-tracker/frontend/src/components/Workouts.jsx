import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config/api.js'
import { readCollection } from './readCollection.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/workouts/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then(readCollection)
      .then(setWorkouts)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id}>
            <strong>{workout.name}</strong> · {workout.difficulty}<br />{workout.description}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
