import { Song } from '../../types/Song'
import Icon from './Icon'
interface Props {
  song: Song
}

function SongListItem(props: Props) {
  // const { song } = props
  return props.song.map((report: any) => (
    <a key={report.id} href={`/moderator/reports/${report.id}`}>
      <li key={report.id} className="list-none flex gap-4">
        <div className="self-center flex-none">
          <Icon>
            <i className="fa-solid fa-triangle-exclamation text-black" />
          </Icon>
        </div>

        <div className="flex flex-col w-36 flex-auto">
          <h3 className="text-white">{report.title}</h3>
          <h4 className="text-xs text-lightPurple">{report.artist}</h4>
        </div>
      </li>
    </a>
  ))
}

export default SongListItem
