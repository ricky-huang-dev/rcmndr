/* eslint-disable react/no-unknown-property */
import moment from 'moment'
import { Song } from '../../types/Song'
import Icon from './Icon'

interface Props {
  song: Song
}

function SingleReportDetails(props: Props) {
  // const { song } = props
  return props.song.map((report: any) => (
    <div key={report.id}>
      <tr>
        <td>
          Creation Date: {moment(report.created_on).format('MM/DD/YY HH:MM')}
        </td>
        <br />
        <td>Reported By: {report.first_name + ' ' + report.last_name}</td>
        <br />
        <td>Report Id: {report.id}</td>
        <br />
      </tr>
      <li key={report.id} className="list-none flex gap-4">
        <div className="self-center flex-none">
          <a href={`/reports/${report.id}`}>
            <Icon>
              <i className="fa-solid fa-play text-black" />
            </Icon>
          </a>
        </div>
        <div className="flex flex-col w-36 flex-auto">
          <h3 className="text-white">{report.title}</h3>
          <h4 className="text-lightPurple tx-sm">{report.artist}</h4>
          <h4 className="text-xs text-lightPurple">{report.genre}</h4>
        </div>

        <div className="flex flex-row gap-2 self-center flex-none">
          <button hx-patch={`/moderator/reports/${report.id}`} hx-target="body">
            <Icon>
              <i className="fa-regular fa-thumbs-up" />
            </Icon>
          </button>
          <button hx-patch={`/moderator/banned/${report.id}`} hx-target="body">
            <Icon className="bg-warning">
              <i className="fa-solid fa-trash" />
            </Icon>
          </button>
        </div>
      </li>
      <p className="text-left">Reason For Report: {report.reason}</p>
      <p>Current Status: {report.is_banned ? 'Banned' : 'Not banned'}</p>
    </div>
  ))
}

export default SingleReportDetails
