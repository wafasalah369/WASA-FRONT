import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import api from '../api/axios'

export default function Profile() {
  const { user, logout } = useAuth()
  const [profileData, setProfileData] = useState<any>(null)
  const [error, setError] = useState('')
  const [fetched, setFetched] = useState(false) // Prevent multiple API calls

  useEffect(() => {
    if (user?.id && !fetched) {
      setFetched(true) // Ensure API is only called once
      api.get(`/users/${user.id}`)
        .then(res => setProfileData(res.data))
        .catch(err => {
          setError('Failed to load profile data')
          console.error('Profile error:', err)
        })
    }
  }, [user, fetched]) // Dependency array includes `fetched`

  return (
    <div>
      <h2>Profile</h2>
      {error && <p className="error">{error}</p>}
      {profileData ? (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
        </div>
      ) : (
        !error && <p>Loading profile...</p>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
