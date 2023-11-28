import { useAuth0 } from '@auth0/auth0-react'
import { AddSongDraft } from '../../../types/Song'
import AddSong from '../../components/AddSong/AddSong'
import useInsertSong from '../../hooks/useInsertSong'

function Songs() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { mutation } = useInsertSong()

  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  async function handleSubmit(form: AddSongDraft) {
    const token = await getAccessTokenSilently()
    mutation.mutate({ form, token })
  }

  return (
    <div className="p-4 mt-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Add new song</h1>
        <h2 className="text-l">
          Fill in the details below to add a new song to your list
        </h2>
        <AddSong handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default Songs
