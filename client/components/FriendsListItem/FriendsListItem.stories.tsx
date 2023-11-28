import type { Meta, StoryObj } from '@storybook/react'


import Background from '../UI/Background/Background'
import FriendsListItem from './FriendsListItem'
import { Friend } from '../../../types/User'

const meta: Meta<typeof FriendsListItem> = {
  title: 'friendsListItem',
  component: FriendsListItem,
}

type Story = StoryObj<typeof FriendsListItem>

const friend: Friend = {
  id: 'auth0|6478f3fd75374ee3d7bc4d94',
  firstName: 'Jared',
  lastName: 'Pinfold',
  nickname: 'DestroyOrbison'
}

export const friendsListItem: Story = {
  name: 'FriendsListItem',
  render: () => (
    <Background>
      <FriendsListItem
        handleDeleteFriend={()=>{}}
        friend={friend}
      />
    </Background>
  ),
}

export default meta
