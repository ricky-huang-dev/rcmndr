import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderComponent } from '../../test-utils'
import AddSong from './AddSong'
import { AddSongDraft } from '../../../types/Song'

describe('AddSong', () => {
  it('should render form', () => {
    const handleSubmit = vi.fn()
    renderComponent(<AddSong handleSubmit={handleSubmit} />)

    expect(screen.getByLabelText(/song title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/artist/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/link/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('event handler should be called when form is submitted', async () => {
    const handleSubmit = vi.fn((form: AddSongDraft) => {
      expect(form).toMatchObject({
        title: 'dummy-song',
        artist: 'dummy-artist',
        genre: 'dummy-genre',
        link: 'dummy-link',
        comments: 'dummy-comments',
      })
    })

    const { user } = renderComponent(<AddSong handleSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Song title*'), 'dummy-song')
    await user.type(screen.getByLabelText('Artist*'), 'dummy-artist')
    await user.type(screen.getByLabelText('Genre*'), 'dummy-genre')
    await user.type(screen.getByLabelText('Link'), 'dummy-link')
    await user.type(screen.getByLabelText('Comment'), 'dummy-comments')

    const form = screen.getByRole('button', { name: 'Save' })
    await user.click(form)

    expect(handleSubmit).toHaveBeenCalled()
  })
})
