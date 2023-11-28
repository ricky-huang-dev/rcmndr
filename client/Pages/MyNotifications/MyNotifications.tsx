import useNotifications from '../../hooks/useNotifications'
import useUpdateTitle from '../../hooks/useUpdateTitle'

function MyNotification() {
  useUpdateTitle('notification')
  const { data } = useNotifications()
  return (
    <div>
      <ul>
        {data?.map((notification) => {
          return (
            <li key={notification.notificationId}>{notification.message}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default MyNotification
