import db from './connection'
import { Notification } from '../../types/Notifications'

export async function getNotifications(userId: string) {
  userId = 'auth0|6478f3fd75374ee3d7bc4d94'

  const userDeets = await db('notifications')
    .join('users', 'notifications.friend_id', 'users.auth0_id')
    // .join('users as currentUser', 'notifications.id', 'users.auth0_id')
    .where('notifications.friend_id', userId)
    .andWhere('is_read', false)
    // .andWhere('users.first_name', 'notifications.user_id')
    .orderBy('timestamp', 'desc')
    .select(
      'notifications.id as notificationId',
      'notifications.timestamp as notificationTimestamp',
      'notifications.message',
      'notifications.friend_id as friendId',
      'notifications.user_id as currentUser'
    )

  console.log(userDeets)

  // const friendDeets = userDeets.map(async (obj) => {
  //   return await getFriendDeets(obj.currentUser.firstName)
  // })
  const friendDeets = await getFriendDeets(userDeets[1].currentUser)
  console.log(friendDeets)

  return userDeets
}

export async function getFriendDeets(friendId: string) {
  return await db('users')
    .join('notifications', 'notifications.user_id', 'users.auth0_id')
    .where('notifications.user_id', friendId)
    .select('users.first_name as firstName')
}
