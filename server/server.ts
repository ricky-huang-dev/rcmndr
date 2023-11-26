import express from 'express'
import * as Path from 'node:path'
import * as oidc from 'express-openid-connect'

import userRouter from './routes/users'
import songRouter from './routes/songs'
import notifications from './routes/notifications'
import moderator from './routes/moderator'
import { oidcConfig } from './auth0'

const server = express()

server.use(oidc.auth(oidcConfig))
server.use(express.json())

server.use('/api/v1/users', userRouter)
server.use('/api/v1/songs', songRouter)
server.use('/api/v1/notifications', notifications)
server.use('/moderator', moderator)

// auth0 middleware calls this route when moderators login
server.get('/login', (_, res) => {
  res.oidc.login({
    returnTo: '/moderator/dashboard',
    authorizationParams: {
      redirect_uri: 'http://localhost:3000/callback',
    },
  })
})

// auth0 middleware calls this route when moderators logout
server.get('/logout', (_, res) => {
  res.oidc.logout({ returnTo: '/moderator/home' })
})

server.use(express.static(Path.resolve('public')))
if (process.env.NODE_ENV === 'production') {
  server.use('/', express.static(Path.resolve('./dist/assets')))
  server.get('*', (_, res) => {
    res.sendFile(Path.resolve('./dist/assets/index.html'))
  })
}

export default server
