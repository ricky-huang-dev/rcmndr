import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

import { AddSongDraft } from '../../types/Song'
import { addSong, getSongs } from '../apis/songs'

function useInsertSong() {
  const navigate = useNavigate()
  const { user, getAccessTokenSilently } = useAuth0()

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await getSongs(accessToken)
        return response
      }
    },
  })

  const mutation = useMutation({
    mutationFn: ({ form, token }: { form: AddSongDraft; token: string }) =>
      addSong(form, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
      navigate('/my-songs')
    },
  })

  return { data, isLoading, mutation }
}

export default useInsertSong
