import { useEffect, useState } from 'react'
import { apiBaseUrl } from './config/api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/users/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then(setUsers)
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      <ul className="list-group">
        {users.map((user) => <li className="list-group-item" key={user._id}>{user.username} · {user.email}</li>)}
      </ul>
    </section>
  )
}

export default Users
