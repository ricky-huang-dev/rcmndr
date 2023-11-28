import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFriends, unfollowUser } from '../../apis/user'
import useUpdateTitle from '../../hooks/useUpdateTitle'
import { useAuth0 } from '@auth0/auth0-react'
import FriendsListItem from '../../components/FriendsListItem/FriendsListItem'

function MyFriends() {
  useUpdateTitle('MyFriends')
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myFriends'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const songs = await getFriends(token)
      return songs
    },
  })
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const token = await getAccessTokenSilently()
      await unfollowUser(id, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['myFriends']})
    },
  })

  function handleDeleteFriend(id: string) {
    mutation.mutate(id)
  }

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  if (isError) {
    return <p>something went wrong</p>
  }

  return (
    <div>
      {/* Todo: add search functionality */}
      <h1>My friends</h1>
      <div>
        {data &&
          data.map((friend) => {
            return (
              <FriendsListItem
                key={friend.id}
                friend={friend}
                handleDeleteFriend={() => handleDeleteFriend(friend.id)}
              />
            )
          })}
      </div>
    </div>
  )
}

export default MyFriends
