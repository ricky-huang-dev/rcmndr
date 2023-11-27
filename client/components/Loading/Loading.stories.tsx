import type { Meta, StoryObj } from '@storybook/react'
import Loading from './Loading'
import Background from '../UI/Background/Background'

const meta: Meta<typeof Loading> = {
  title: 'Loadingcheckurl',
  component: Loading,
}

type Story = StoryObj<typeof Loading>

export const loading: Story = {
  name: 'LoadingcheckTab',
  render: () => (
    <Background>
      <Loading></Loading>
    </Background>
  ),
}

export default meta
