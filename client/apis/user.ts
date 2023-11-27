import request from 'superagent'
import { Friend } from '../../types/User'
import { Profile, ProfileDraft } from '../../types/Profile'

export async function upsertProfile(
  form: ProfileDraft | Profile,
  token: string
) {
  await request
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(form)
}

export async function getUser(token: string) {
  const res = await request
    .get('/api/v1/users/')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body as Profile
}

export async function getUserByAuth0Id(token: string, otherUserId: string) {
  const res = await request
    .get(`/api/v1/users/${otherUserId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body as Profile
}

export async function followUser(auth0: string, token: string) {
  const res = await request
    .post(`/api/v1/users/${auth0}/follow`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}

export async function getFriends(token: string) {
  const res = await request
    .get(`/api/v1/users/friends`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body as Friend[]
}
