import type { Meta, StoryObj } from '@storybook/react'

import Background from '../../components/UI/Background/Background'
import ErrorPage from './ErrorPage'
import {
  RouterProvider,
  createMemoryRouter,
  Route,
  Outlet,
  createRoutesFromElements,
} from 'react-router-dom'

const meta: Meta<typeof ErrorPage> = {
  title: 'ERROR PAGE <!>',
  component: ErrorPage,
}

type Story = StoryObj<typeof ErrorPage>

const routes = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route
        index
        element={
          <Background>
            <ErrorPage />
          </Background>
        }
      />
    </Route>
  )
)

export const MyPrimary: Story = {
  name: 'Primary',
  render: () => <RouterProvider router={routes}></RouterProvider>,
}

export default meta
