import { useParams } from 'react-router-dom'
import { getUserByAuth0Id } from '../../apis/user'
import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'

function ConfirmScan() {
  const { code } = useParams()

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', code],
    queryFn: async () => {
      if (code) {
        const token = await getAccessTokenSilently()
        return await getUserByAuth0Id(token, code)
      }
    },
  })

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  if (!code) {
    return <div>No valid code</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading user data...</div>
  }

  return (
    data && (
      <div>
        {data.firstName} {data.lastName} ({data.nickname})
      </div>
    )
  )
}

export default ConfirmScan
