import type { Meta, StoryObj } from '@storybook/react'

// import Button from './Button'
import Background from '../../components/UI/Background/Background'
import SpinningLoader from './SpinningLoader'

const meta: Meta<typeof SpinningLoader> = {
  title: 'Spinning Loader',
  component: SpinningLoader,
}

type Story = StoryObj<typeof SpinningLoader>

export const MyPrimary: Story = {
  name: 'Spinning Loader',
  render: () => (
    <Background>
      <SpinningLoader />,
    </Background>
  ),
}

export default meta
