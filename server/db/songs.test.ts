import { it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { getSongs } from './songs'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

it('should return all songs that aren`t banned', async () => {
  const userId = 'auth0|6478f3fd75374ee3d7bc4d94'
  const songData = {
    id: 1,
    title: 'Hengelo',
    artist: 'Spring Offensive',
    genre: 'Indie Rock',
    link: 'https://open.spotify.com/track/4rqpg85XNApASjAvqjHlb1?si=2bdc00343f3e47f2',
    comments: 'this song is so great',
  }

  const allSongs = await getSongs(userId)
  expect(allSongs).toHaveLength(7)
  expect(allSongs[0]).toMatchObject(songData)
})
