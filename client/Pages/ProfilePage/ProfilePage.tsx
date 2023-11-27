import { useAuth0 } from '@auth0/auth0-react'

import ProfileForm from '../../components/ProfileForm/ProfileForm'
import { Profile, ProfileDraft } from '../../../types/Profile'
import useProfile from '../../hooks/useProfile'
import useUpdateTitle from '../../hooks/useUpdateTitle'

function ProfilePage() {
  useUpdateTitle('Profile')
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, mutation } = useProfile()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  async function handleSubmit(form: ProfileDraft | Profile) {
    const token = await getAccessTokenSilently()
    mutation.mutate({ form, token })
  }

  return (
    <div>
      <ProfileForm handleSubmit={handleSubmit} profile={data} />
    </div>
  )
}

export default ProfilePage
