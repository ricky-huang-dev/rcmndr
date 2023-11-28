import db from './connection'
import { Friend } from '../../types/User'
import { Profile } from '../../types/Profile'

export async function getUser(auth0Id: string): Promise<Profile | null> {
  return await db('users')
    .where('auth0_id', auth0Id)
    .first(
      'auth0_id as auth0Id',
      'nickname',
      'first_name as firstName',
      'last_name as lastName',
      'public'
    )
}

export async function upsertProfile(profile: Profile) {
  await db('users')
    .insert({
      auth0_id: profile.auth0Id,
      nickname: profile.nickname,
      first_name: profile.firstName,
      last_name: profile.lastName,
      public: profile.public,
    })
    .onConflict('auth0_id')
    .merge()
}

export async function getFriends(userId: string) {
  return (await db('following_list')
    .join('users', 'users.auth0_id', 'following_list.following_id')
    .select(
      'users.auth0_id as id',
      'nickname',
      'first_name as firstName',
      'last_name as lastName'
    )
    .where('user_id', userId)) as Friend[]
}

// this db function searches for users that are not already being followed by the user
// and that are not the user itself
// and that are public
// and that match nickname, first name, last name, or genre
export async function searchFriends(userId: string, q: string) {
  const rawQuery = `
SELECT DISTINCT  uu.auth0_id, uu.first_name, uu.last_name, uu.nickname
FROM (
  SELECT following_id
  FROM following_list
  WHERE user_id = ?
) AS f
CROSS JOIN (
  SELECT DISTINCT auth0_id as user_id
  FROM users
  WHERE auth0_id <> ?
) AS u
LEFT JOIN following_list AS existing
  ON existing.user_id =  ? AND existing.following_id = u.user_id
RIGHT JOIN users as uu ON uu.auth0_id = existing.following_id 
RIGHT JOIN songs as s ON s.user_id = uu.auth0_id
WHERE existing.user_id IS NULL
AND uu.auth0_id <> ?
AND uu.public = true
AND (LOWER(uu.nickname) LIKE ?
OR LOWER(uu.first_name) LIKE ?
OR LOWER(uu.last_name) LIKE ?
OR LOWER(s.genre) LIKE ?)
`

  const newUsersToFollow = await db.raw(rawQuery, [
    userId,
    userId,
    userId,
    userId,
    `%${q}%`,
    `%${q}%`,
    `%${q}%`,
    `%${q}%`,
  ])

  return newUsersToFollow as Friend[]
}

export async function followFriends(friendId: string, userId: string) {
  await db('following_list').insert({
    user_id: userId,
    following_id: friendId,
  })
}

export async function unfollowFriend(userId: string, friendId: string) {
  return await db('following_list')
    .where('user_id', userId)
    .where('following_id', friendId)
    .del()
}
