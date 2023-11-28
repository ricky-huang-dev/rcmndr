import type { Meta, StoryObj } from '@storybook/react'

import Background from '../UI/Background/Background'
import AddSong from './AddSong'

const meta: Meta<typeof AddSong> = {
  title: 'addSong',
  component: AddSong,
}

type Story = StoryObj<typeof AddSong>

export const addSong: Story = {
  name: 'AddSong',
  render: () => (
    <Background>
      <AddSong handleSubmit={() => {}} />
    </Background>
  ),
}

export default meta
