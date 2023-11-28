import { useState } from 'react'
import Button from '../../components/UI/Button/Button'
import TextBox from '../../components/UI/TextBox/TextBox'
import { followFriends, searchFriends } from '../../apis/user'
import { useAuth0 } from '@auth0/auth0-react'
import Icon from '../../components/UI/Icon/Icon'

interface user {
  auth0_id: string
  first_name: string
  last_name: string
  nickname: string
}

function FindFriends() {
  const [input, setInput] = useState('')
  const [searchData, setSearchData] = useState([] as user[])

  const { user, getAccessTokenSilently } = useAuth0()

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.currentTarget.value)
  }

  async function handleFind() {
    const accessToken = await getAccessTokenSilently()
    if (user && user.sub) {
      const response = await searchFriends(input, accessToken)

      setSearchData(response)
    }
  }

  async function handleFollow(friend_id: string) {
    const accessToken = await getAccessTokenSilently()
    followFriends(friend_id, accessToken)
  }
    
  return (
    <div className="p-4 mt-10 space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">My friends</h1>
        <h2 className="text-xl font-semibold">Follow a new friend</h2>
        <div className="flex items-baseline gap-2">
          <TextBox
            onChange={handleInput}
            placeholder="genre, nickname or a real name"
          />
          <Button onClick={handleFind}>Find</Button>
        </div>
        <p className="pl-10 text-sm text-purple-400 text-center">
          No rcmndrs match your criteria
        </p>
      </div>
      <div className="h-4 border-gray-400">
        <p>Loading...</p>
      </div>
      <ul>
        <li>
          <div className="mx-auto ">
            {searchData?.map((u) => (
              <div
                key={u.auth0_id}
                className="flex justify-between items-center  py-2"
              >
                <p key={u.auth0_id}>{u.first_name}</p>
                <button onClick={() => handleFollow(u.auth0_id)}>
                  <Icon>
                    <i className="fa-solid fa-heart"></i>
                  </Icon>
                </button>
              </div>
            ))}
          </div>
        </li>
      </ul>
      <div>
        <p>Display existing friends here</p>
      </div>
    </div>
  )
}

export default FindFriends
