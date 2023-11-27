import express from 'express'
import { getSongs } from '../db/songs'
import { validateAccessToken } from '../auth0'
import { logError } from '../logger'

const router = express.Router()

// GET /api/v1/songs

router.get('/', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub
  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const allSongs = await getSongs(auth0Id)
    res.status(200).json(allSongs)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'database error' })
  }
})

// POST /api/v1/songs

export default router
