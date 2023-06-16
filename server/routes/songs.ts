import express from 'express'

import * as db from '../db/songs'
import { validateAccessToken } from '../auth0'
import { songDraftSchema } from '../../types/Song'
import { logError } from '../logger'

const router = express.Router()

// GET /api/v1/songs/
router.get('/', validateAccessToken, async (req, res) => {
  try {
    const userId = req.auth?.payload.sub
    if (!userId) {
      return res.status(401).json({ error: 'unauthorized' })
    }
    const songs = await db.getSongs(userId)
    res.json(songs)
  } catch (error) {
    logError(error)
    res.status(500).json({ error: 'unable to retrieve songs from database' })
  }
})

export default router
