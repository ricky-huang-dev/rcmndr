import request from 'superagent'

import { Song } from '../../types/Song'

const baseUrl = '/api/v1/songs/'

export async function getSongs(token: string): Promise<Song[]> {
  const response = await request
    .get(baseUrl)
    .set('Authorization', `Bearer ${token}`)

  return response.body as Song[]
}
