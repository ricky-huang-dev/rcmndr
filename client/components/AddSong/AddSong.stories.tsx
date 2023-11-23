import type { Meta, StoryObj } from '@storybook/react'

import AddSong from './AddSong'
import Background from '../UI/Background/Background'
// import { AddSongDraft } from '../../../types/Song'

const meta: Meta<typeof AddSong> = {
  title: 'addSong',
  component: AddSong,
}

type Story = StoryObj<typeof AddSong>

// const songDraft: AddSongDraft = {
//   title: 'Song Title',
//   artist: 'Song Artist',
//   genre: 'Song Genre',
//   link: 'https://www.youtube.com/watch?v=1',
//   comment: 'this is a great song',
// }

export const addSong: Story = {
  name: 'AddSong',
  render: () => (
    <Background>
      <AddSong />
    </Background>
  ),
}

export default meta
