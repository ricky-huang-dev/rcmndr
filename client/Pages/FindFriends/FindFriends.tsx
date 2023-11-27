import Button from '../../components/UI/Button/Button'
import TextBox from '../../components/UI/TextBox/TextBox'
import useUpdateTitle from '../../hooks/useUpdateTitle'

function FindFriends() {
  useUpdateTitle('FindFriends')
  return (
    <div className="p-4 mt-10 space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">My friends</h1>
        <h2 className="text-xl font-semibold">Follow a new friend</h2>
        <div className="flex items-baseline gap-2">
          <TextBox placeholder="genre, nickname or a real name" />
          <Button>Find</Button>
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
          <p>First user</p>
          <p>Second second</p>
        </li>
      </ul>
      <div>
        <p>Display existing friends here</p>
      </div>
    </div>
  )
}

export default FindFriends
