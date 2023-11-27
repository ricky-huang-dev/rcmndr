/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { renderToStaticMarkup } from 'react-dom/server'

import Layout from '../components/Layout'
import * as auth from '../auth0'
import {
  getProcessedReports,
  getSingleReport,
  getUnprocessedReports,
  updateReport,
} from '../db/moderator'
import SongListItem from '../components/SongListItem'
import SingleReportDetails from '../components/SingleReportDetails'

const router = express.Router()

router.get('/home', (_, res) => {
  res.send(
    renderToStaticMarkup(
      <Layout title="">
        <main>This is the landing page for unsigned admins</main>
      </Layout>
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
        <Layout title="All Reported Songs">
          <main>
            <ul>
              Unprocessed: <SongListItem song={unprocessedReports} />
              <br />
              Processed: <SongListItem song={processedReports} />
            </ul>
          </main>
        </Layout>
      )
    )
  }
)

router.get('/reports/:id', async (req, res) => {
  const id = +req.params.id
  const singleReport = await getSingleReport(id)

  res.send(
    renderToStaticMarkup(
      <Layout title="Report Details">
        <main>
          <SingleReportDetails key={id} song={singleReport} />
        </main>
      </Layout>
    )
  )
})

router.post('/reports/:id', async (req, res) => {
  const report_id = +req.params.id
  console.log(report_id)
  await updateReport(report_id)

  res.redirect('/moderator/dashboard')
})
export default router
