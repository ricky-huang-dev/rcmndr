import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import ProfileForm from '../../components/ProfileForm/ProfileForm'
import { Profile, ProfileDraft } from '../../../types/Profile'
import { upsertProfile } from '../../apis/user'
import useFetchUser from '../../hooks/useFetchProfile'

function ProfilePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()

  const userQuery = useFetchUser()
  const mutation = useMutation({
    mutationFn: ({
      form,
      token,
    }: {
      form: ProfileDraft | Profile
      token: string
    }) => upsertProfile(form, token),
    onSuccess: () => {
      navigate('/my-songs')
    },
  })

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  async function handleSubmit(form: ProfileDraft | Profile) {
    const token = await getAccessTokenSilently()
    mutation.mutate({ form, token })
    navigate('/my-songs')
  }

  return (
    <div>
      <ProfileForm handleSubmit={handleSubmit} profile={userQuery.data} />
    </div>
  )
}

export default ProfilePage
