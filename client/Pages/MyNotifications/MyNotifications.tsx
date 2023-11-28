import Button from '../../components/UI/Button/Button'
import Icon from '../../components/UI/Icon/Icon'
import useNotifications from '../../hooks/useNotifications'
import useUpdateTitle from '../../hooks/useUpdateTitle'

function MyNotification() {
  useUpdateTitle('notification')
  const { data } = useNotifications()
  return (
    <div>
      <h1 className="py-1 px-4 text-4xl font-bold">My notifications</h1>
      <Button>Dismiss</Button>
      <ul>
        {data?.map((notification) => {
          return (
            <li
              key={notification.notificationId}
              className="flex list-none gap-1 py-1 px-4"
            >
              <div className="self-center flex-none">
                <Icon>
                  <i className="fa-solid fa-user" />
                </Icon>
              </div>
              <div className="flex flex-col w-36 flex-auto">
                <h3 className="text-white">{notification.message}</h3>
                <h4 className="text-xs text-lightPurple">
                  {notification.firstName}
                </h4>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MyNotification
