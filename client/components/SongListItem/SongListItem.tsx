import { Song } from '../../../types/Song'
import Icon from '../UI/Icon/Icon'

interface Props {
  song: Song
  handleDeleteSong: (songId: string) => void
  handleEditSong: (songId: string) => void
  handlePlaySong: (songId: string) => void
}

function SongListItem(props: Props) {
  const { song, handleDeleteSong, handleEditSong, handlePlaySong } = props
  return (
    <li className="list-none flex gap-4">
      <div className="self-center flex-none">
        <button onClick={() => handlePlaySong(song.id)}>
          <Icon>
            <i className="fa-solid fa-play text-black" title="play song" />
          </Icon>
        </button>
      </div>
      <div className="flex flex-col w-36 flex-auto">
        <h3 className="text-white">{song.title}</h3>
        <h4 className="text-xs text-lightPurple">{song.artist}</h4>
      </div>
      <div className="flex flex-row gap-2 self-center flex-none">
        <button onClick={() => handleEditSong(song.id)}>
          <Icon>
            <i className="fa-solid fa-pen" title="edit song" />
          </Icon>
        </button>
        <button onClick={() => handleDeleteSong(song.id)}>
          <Icon className="bg-warning">
            <i className="fa-solid fa-trash" title="delete song" />
          </Icon>
        </button>
      </div>
    </li>
  )
}

export default SongListItem
