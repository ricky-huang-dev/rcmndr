import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getNotifications } from '../apis/notifications'

function useNotifications() {
  const { user, getAccessTokenSilently } = useAuth0()
  const { data, isLoading } = useQuery({
    queryKey: ['notification'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await getNotifications(accessToken)
        return response
      }
    },
  })
  return { data, isLoading }
}

export default useNotifications
