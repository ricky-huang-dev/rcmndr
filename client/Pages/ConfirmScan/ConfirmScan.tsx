import { useParams } from 'react-router-dom'
import { getUserByAuth0Id } from '../../apis/user'
import { useQuery } from '@tanstack/react-query'

function ConfirmScan() {
  const { code } = useParams()
  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik52aDRSc1JlaEo1RjVlN2E4MzVvYSJ9.eyJpc3MiOiJodHRwczovL3JjbW5kci1kZXYtYWNhZGVteS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjQ3OGYzZmQ3NTM3NGVlM2Q3YmM0ZDk0IiwiYXVkIjoiaHR0cHM6Ly9yY21uZHIvYXBpIiwiaWF0IjoxNzAxMDU1NzUyLCJleHAiOjE3MDExNDIxNTIsImF6cCI6IjZHYmtLNFo0V3lOQWNSYWRyUFlzV0xyZ2FGVDdHYW9hIiwiZ3R5IjoicGFzc3dvcmQiLCJwZXJtaXNzaW9ucyI6W119.ozWEulHfFMDzpPWf-eHupvtEVO98DodLTVTFrYJvZlxFaQcroZkqOMY-0KfIuD0dantuEu4yznx4keInUI3uoPVsTHtAg06qpLS8hJFR0yaiU6kbvhTL8CxNzld2ZlghQBVmjwZkJLFFecLxKDitNoUxDLyksrA7EP6CjqQ6IXJh4SxUE6dIKqZxrN5ejmvwn4ywRBd8ULzrIwyQRqLE4pnHSfmE4FURoRqPUHfHKfM4dl1danK3T4hqa6-jtbMobUxYIt0s68zndBlhqaxFmldQCwxyVCg9Jwxb98zjs1fS5WBJiEv-VpP4VLjX23Dsaq-N2V2zSW98q-x2Iyegww'

  const { data, isLoading, isError } = useQuery({
    queryKey: ['friend'],
    queryFn: async () => {
      if (code) {
        return await getUserByAuth0Id(token, code)
      }
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading user data...</div>
  }

  return (
    data && (
      <div>
        {data.firstName} {data.lastName} ({data.nickname})
      </div>
    )
  )
}

export default ConfirmScan
