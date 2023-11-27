import { describe, it, expect, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import nock from 'nock'

import { renderWithQuery } from '../../test-utils'
import MySongs from './MySongs'

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      sub: 'auth0|123',
      email: '',
    },
    isAuthenticated: true,
    getAccessTokenSilently: vi.fn(() => 'token'),
  }),
}))

describe('MySongs', () => {
  it('should render my songs list', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/songs/')
      .reply(200, [
        {
          id: '1',
          title: 'Hengelo',
          artist: 'Spring Offensive',
          genre: 'Indie Rock',
          link: 'https://open.spotify.com/track/4rqpg85XNApASjAvqjHlb1?si=2bdc00343f3e47f2',
        },
      ])

    const container = renderWithQuery(<MySongs />)
    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const songName = container.getByRole('heading', { level: 3 })
    const artist = container.getByRole('heading', { level: 4 })
    const playButton = container.getByTitle('play song')
    const deleteButton = container.getByTitle('delete song')
    const editButton = container.getByTitle('edit song')

    expect(songName).toContainHTML('Hengelo')
    expect(artist).toContainHTML('Spring Offensive')
    expect(playButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
  })
})
