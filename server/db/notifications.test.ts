import { beforeAll, beforeEach, describe, it, expect } from 'vitest'

import db from './connection'
import { getNotifications, insertNotifications } from './notifications'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getNotifications', () => {
  it('returns notifications for a user', async () => {
    const userId = 'auth0|6478f3fd75374ee3d7bc4d94'
    const notifications = await getNotifications(userId)

    expect(notifications).toHaveLength(1)
    expect(notifications).toMatchObject([
      {
        notificationId: 1,
        message: 'DestroyOrbison is following you',
        nickname: 'D1am0nd',
      },
    ])
  })
})

describe('setNotifications', () => {
  it('marks notifications as read', async () => {
    const userId = 'auth0|6478f3fd75374ee3d7bc4d94'
    const notifications = await getNotifications(userId)
    const notificationIds = notifications.map((n) => n.notificationId)
    await insertNotifications(userId, notificationIds)
    const updatedNotifications = await getNotifications(userId)
    expect(updatedNotifications).toHaveLength(0)
  })
})
