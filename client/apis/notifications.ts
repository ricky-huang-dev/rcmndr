import request from 'superagent'

import { Notification } from '../../types/Notifications'

const baseUrl = '/api/v1/notifications'

export async function getNotifications(token: string) {
  const response = await request
    .get(baseUrl)
    .set('Authorization', `Bearer ${token}`)

  return response.body as Notification[]
}
