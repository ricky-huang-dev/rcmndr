import type { Meta, StoryObj } from '@storybook/react'

import SongListItem from './SongListItem'
import Background from '../UI/Background/Background'
import { Song } from '../../../types/Song'

const meta: Meta<typeof SongListItem> = {
  title: 'songListItem',
  component: SongListItem,
}

type Story = StoryObj<typeof SongListItem>

const song: Song = {
  id: '1',
  title: 'Song Title',
  artist: 'Song Artist',
  genre: 'Song Genre',
  link: 'https://www.youtube.com/watch?v=1',
}

export const songListItem: Story = {
  name: 'SongListItem',
  render: () => (
    <Background>
      <SongListItem
        handlePlaySong={() => {}}
        handleEditSong={() => {}}
        handleDeleteSong={() => {}}
        song={song}
      />
    </Background>
  ),
}

export default meta
