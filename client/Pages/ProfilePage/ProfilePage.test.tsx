import { describe, it, expect, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import nock from 'nock'

import { renderWithQuery } from '../../test-utils'
import ProfilePage from './ProfilePage'

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

// Change Ahmad requested as screen readers check for either placeholder or label.
describe('ProfilePage', () => {
  it('should render form', async () => {
    const scope = nock('http://localhost').get('/api/v1/users/').reply(200)

    const container = renderWithQuery(<ProfilePage />)
    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const nickname = container.getByLabelText(/nickname/i)
    const firstName = container.getByLabelText(/first name/i)
    const lastName = container.getByLabelText(/last name/i)
    const isPublic = container.getByRole('checkbox', {
      name: /visible to everyone/i,
    })

    expect(nickname).toBeInTheDocument()
    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(isPublic).not.toBeChecked()
  })
})
