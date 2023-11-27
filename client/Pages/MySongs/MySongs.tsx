import { useQuery } from '@tanstack/react-query'
import SongListItem from '../../components/SongListItem/SongListItem'
import { getSongs } from '../../apis/songs'
import { useAuth0 } from '@auth0/auth0-react'
import useUpdateTitle from '../../hooks/useUpdateTitle'

function MySongs() {
  useUpdateTitle('MySongs')

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['mySongs'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const songs = await getSongs(token)
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
    <div>
      <h1>My Songs</h1>
      <div>
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
    </div>
  )
}

export default MySongs
