import { Friend } from "../../../types/User"
import { useQuery } from '@tanstack/react-query'
import SongListItem from '../../components/SongListItem/SongListItem'
import { getFriendSongs} from '../../apis/songs'
import { useAuth0 } from '@auth0/auth0-react'

interface FriendProps {
  friend: Friend
}

function FriendSongs (props: FriendProps) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { friend } = props

  const { data, isLoading, isError } = useQuery({
    queryKey: ['friendSongs'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const songs = await getFriendSongs(friend.id, token)
      return songs
    },
  })

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  if (isError) {
    return <p>something went wrong</p>
  }

  function handleEditSong() {}

  function handleDeleteSong() {}

  function handlePlaySong() {}

  return (
    <div className='pl-5'>
        {data &&
          data.map((track) => {
            return (
              <SongListItem
                key={track.id}
                handlePlaySong={handlePlaySong}
                handleEditSong={handleEditSong}
                handleDeleteSong={handleDeleteSong}
                song={track}
              />
            )
          })}
    </div>
  )
}

export default FriendSongs