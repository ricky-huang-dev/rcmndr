import request from 'superagent'

import { Notification } from '../../types/Notifications'

const baseUrl = '/api/v1/notifications'

export async function getNotifications(token: string) {
  const res = await request
    .get(baseUrl)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  console.log(token)
  return res.body as Notification[]
}
