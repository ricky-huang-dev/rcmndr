import db from './connection'

export async function getUnprocessedReports() {
  return await db('reports')
    .join('users', 'reports.reported_by', 'users.auth0_id')
    .join('reasons', 'reports.reason_id', 'reasons.id')
    .join('songs', 'reports.song_id', 'songs.id')
    .select('reports.reason_id', 'reasons.reason')
    .select('reports.reported_by', 'users.first_name', 'users.last_name')
    .select('reports.song_id', 'songs.title', 'songs.artist')
    .select('reports.id')
    .where('reports.is_processed', false)
}

export async function getProcessedReports() {
  return await db('reports')
    .join('users', 'reports.reported_by', 'users.auth0_id')
    .join('reasons', 'reports.reason_id', 'reasons.id')
    .join('songs', 'reports.song_id', 'songs.id')
    .select('reports.id')
    .select('reports.reason_id', 'reasons.reason')
    .select('reports.reported_by', 'users.first_name', 'users.last_name')
    .select('reports.song_id', 'songs.title', 'songs.artist')
    .where('reports.is_processed', true)
}

export async function getSingleReport(id: number) {
  return await db('reports')
    .join('users', 'reports.reported_by', 'users.auth0_id')
    .join('reasons', 'reports.reason_id', 'reasons.id')
    .join('songs', 'reports.song_id', 'songs.id')
    .select('reports.id')
    .select('songs.genre')
    .select('reports.reason_id', 'reasons.reason')
    .select('reports.reported_by', 'users.first_name', 'users.last_name')
    .select('reports.song_id', 'songs.title', 'songs.artist')
    .select('songs.is_banned')
    .where('reports.id', id)
}

export async function updateReport(report_id: number) {
  const existingReport = await db('reports')
    .where('reports.id', report_id)
    .select('is_processed')
    .first()

  await db('reports')
    .where('reports.id', report_id)
    .update({ is_processed: !existingReport.is_processed })
}

export async function updateBanStatus(songId: number) {
  console.log(songId)
  // const isBannedStatus = await db('songs')
  //   .where('songs.id', songId)
  //   .select('is_banned')
  //   .first()

  // console.log(isBannedStatus)

  await db('songs')
    .join('reports', 'songs.id', 'reports.song_id')
    .where('songs.id', songId)
    .update({ is_banned: true })
  // .update('songs.is_banned')
}
