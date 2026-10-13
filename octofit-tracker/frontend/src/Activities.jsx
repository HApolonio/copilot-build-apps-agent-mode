import { useEffect, useState } from 'react'
import { apiBaseUrl } from './config/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/activities/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then(setActivities)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id}>
            {activity.user.username} · {activity.type} · {activity.duration} min
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
