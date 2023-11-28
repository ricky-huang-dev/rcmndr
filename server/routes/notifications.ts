import express from 'express'

import { getNotifications } from '../db/notifications'
import { validateAccessToken } from '../auth0'
import { logError } from '../logger'

const router = express.Router()

router.get('/', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  try {
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const notifications = await getNotifications(userId)
    res.json(notifications)
    console.log(notifications)
  } catch (error) {
    logError(error)
    res.status(500).json({ error: 'Unable to retrieve notifications' })
  }
})

export default router
