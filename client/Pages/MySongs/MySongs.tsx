import { useQuery } from '@tanstack/react-query'
import SongListItem from '../../components/SongListItem/SongListItem'
import { getSongs } from '../../apis/songs'
import { useAuth0 } from '@auth0/auth0-react'
import useUpdateTitle from '../../hooks/useUpdateTitle'
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function MySongs() {
  useUpdateTitle('MySongs')

  const newSong = [
    {
      id: '15',
      user_id: '2334554565',
      genre: 'Synthwave',
      title: 'Escape From Midwich Valley',
      artist: 'Carpenter Brut',
      link: 'https://open.spotify.com/track/1jBP9dV1MJhVcNh75yCT6I?si=6a89028c425949d3',
    },
    {
      id: '16',
      user_id: '23345545653',
      genre: 'Synthwave',
      title: 'Escape From Midwich Valley',
      artist: 'Carpenter Brut',
      link: 'https://open.spotify.com/track/1jBP9dV1MJhVcNh75yCT6I?si=6a89028c425949d3',
    },
    {
      id: '17',
      user_id: '23345545655',
      genre: 'Synthwave',
      title: 'Escape From Midwich Valley',
      artist: 'Carpenter Brut',
      link: 'https://open.spotify.com/track/1jBP9dV1MJhVcNh75yCT6I?si=6a89028c425949d3',
    },
  ]

  const [songs, setSongs] = useState(newSong)

  // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['mySongs'],
  //   queryFn: async () => {
  //     const token = await getAccessTokenSilently()
  //     const songs = await getSongs(token)
  //     return songs
  //   },
  // })

  // if (!isAuthenticated && !user) {
  //   return <div>Not authenticated</div>
  // }

  // if (isLoading) {
  //   return <p>loading...</p>
  // }

  // if (isError) {
  //   return <p>something went wrong</p>
  // }

  function handleEditSong() {}

  function handleDeleteSong() {}

  function handlePlaySong() {}

  function handleOnDragEnd(result) {
    if (!result.destination) return
  }

  return (
    <div>
      <h1>My Songs</h1>
      {/* <div>
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
      </div> */}

      <div>
        {songs.map((track) => {
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

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="song-list">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {songs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {song.title}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default MySongs
