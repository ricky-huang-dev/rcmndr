/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { renderToStaticMarkup } from 'react-dom/server'

import { LayoutLoggedOut, LayoutLoggedIn } from '../components/Layout'
import * as auth from '../auth0'
import {
  getProcessedReports,
  getSingleReport,
  getUnprocessedReports,
  updateBanStatus,
  updateReport,
} from '../db/moderator'
import SongListItem from '../components/SongListItem'
import SingleReportDetails from '../components/SingleReportDetails'

const router = express.Router()

router.get('/home', (_, res) => {
  res.send(
    renderToStaticMarkup(
      <LayoutLoggedOut title="Home">
        <main>This is the landing page for unsigned admins</main>
      </LayoutLoggedOut>
    )
  )
})

router.get(
  '/dashboard',
  auth.requiresPermission('moderate:songs'),
  async (req, res) => {
    const unprocessedReports = await getUnprocessedReports()
    const processedReports = await getProcessedReports()

    res.send(
      renderToStaticMarkup(
        <LayoutLoggedIn title="All Reported Songs">
          <main>
            <ul>
              Unprocessed: <SongListItem song={unprocessedReports} />
              <br />
              Processed: <SongListItem song={processedReports} />
            </ul>
          </main>
        </LayoutLoggedIn>
      )
    )
  }
)

router.get(
  '/reports/:id',
  auth.requiresPermission('moderate:songs'),
  async (req, res) => {
    // req.oidc.accessToken ? 'loggedin' : 'not logged'
    const id = +req.params.id
    const singleReport = await getSingleReport(id)

    res.send(
      renderToStaticMarkup(
        <LayoutLoggedIn title="Report Details">
          <main>
            <SingleReportDetails key={id} song={singleReport} />
          </main>
        </LayoutLoggedIn>
      )
    )
  }
)

router.patch(
  '/reports/:id',
  auth.requiresPermission('moderate:songs'),
  async (req, res) => {
    try {
      const report_id = +req.params.id
      console.log(report_id)
      await updateReport(report_id)

      res.redirect(303, '/moderator/dashboard')
    } catch (err) {
      console.error(err)
    }
  }
)

router.patch(
  '/banned/:id',
  auth.requiresPermission('moderate:songs'),
  async (req, res) => {
    try {
      const report_id = +req.params.id
      const reportDetails = await getSingleReport(report_id)
      const songId = reportDetails[0].song_id
      console.log(reportDetails)
      await updateReport(report_id)
      await updateBanStatus(songId)

      res.redirect(303, '/moderator/dashboard')
    } catch (err) {
      console.error(err)
    }
  }
)

export default router
