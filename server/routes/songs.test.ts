import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/songs'
import { getMockToken } from './mockToken'
import { Song } from '../../types/Song'
import dotenv from 'dotenv'
dotenv.config()

vi.mock('../db/songs')
vi.mock('../logger.ts')

describe('GET /api/v1/songs', () => {
  it('should return 200 with a great song', async () => {
    const songData: Song[] = [
      {
        id: '1',
        title: 'Hengelo',
        artist: 'Spring Offensive',
        genre: 'Indie Rock',
        link: 'https://open.spotify.com/track/4rqpg85XNApASjAvqjHlb1?si=2bdc00343f3e47f2',
      },
    ]

    vi.mocked(db.getSongs).mockResolvedValue(songData)
    const response = await request(server)
      .get('/api/v1/songs')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(songData)
  })

  it('should return 401 when no access token is passed', async () => {
    vi.mocked(db.getSongs).mockRejectedValue(new Error('test'))
    const response = await request(server).get('/api/v1/songs')
    expect(response.status).toBe(401)
  })

  it('should return 500 when getSongs fails', async () => {
    vi.mocked(db.getSongs).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/songs')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'database error' })
  })
})
