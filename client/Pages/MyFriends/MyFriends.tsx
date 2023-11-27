import useUpdateTitle from '../../hooks/useUpdateTitle'

function MyFriends() {
  useUpdateTitle('MyFriends')
  const data = [{ id: 1, nickname: 'First user' }]

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">My existing friends</h1>
      <ul className="space-y-4">
        {data &&
          data?.map((friend) => <li key={friend.id}>{friend.nickname}</li>)}
      </ul>
    </div>
  )
}

export default MyFriends
