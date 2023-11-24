import db from './connection'

export async function getUnprocessedReports() {
  return await db('reports')
    .join('users', 'reports.reported_by', 'users.auth0_id')
    .join('reasons', 'reports.reason_id', 'reasons.id')
    .join('songs', 'reports.song_id', 'songs.id')
    .select('reason_id', 'reasons.reason')
    .select('reported_by', 'users.first_name', 'users.last_name')
    .select('song_id', 'songs.title', 'songs.artist')
    .select('*')
    .where('reports.is_processed', false)
}

export async function getProcessedReports() {
  return await db('reports')
    .join('users', 'reports.reported_by', 'users.auth0_id')
    .join('reasons', 'reports.reason_id', 'reasons.id')
    .join('songs', 'reports.song_id', 'songs.id')
    .select('reason_id', 'reasons.reason')
    .select('reported_by', 'users.first_name', 'users.last_name')
    .select('song_id', 'songs.title', 'songs.artist')
    .select('*')
    .where('reports.is_processed', true)
}
