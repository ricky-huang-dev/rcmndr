import { describe, it, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { insertSong } from './insertSong'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('add song', () => {
  it('should add a new song', async () => {
    const newSong = {
      userId: 'auth0|6478f3fd75374ee3d7bc4d94',
      title: 'test-title',
      artist: 'test-artist',
      genre: 'test-genre',
      link: 'www.test.com',
      comments: 'test-comment',
    }
    await insertSong(newSong)

    const exitingSongs = await db('songs').select()
    expect(exitingSongs).toHaveLength(36)
    expect(exitingSongs).toContainEqual({
      user_id: 'auth0|6478f3fd75374ee3d7bc4d94',
      title: 'test-title',
      artist: 'test-artist',
      genre: 'test-genre',
      link: 'www.test.com',
      comments: 'test-comment',
      is_banned: 0,
      id: 107,
    })
  })
})
