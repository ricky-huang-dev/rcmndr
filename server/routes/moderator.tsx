/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { renderToStaticMarkup } from 'react-dom/server'
import moment from 'moment'

import Layout from '../components/Layout'
import * as auth from '../auth0'
import { getProcessedReports, getUnprocessedReports } from '../db/moderator'

const router = express.Router()

router.get('/home', (_, res) => {
  res.send(
    renderToStaticMarkup(
      <Layout>
        <main>This is the landing page for unsigned admins</main>
      </Layout>
    )
  )
})

function getReports(reports: any) {
  return (
    <>
      {reports.map((report: any) => (
        <table key={report.id}>
          <tr key={report.id}>
            <td>
              User: {report.first_name} {report.last_name}
            </td>
          </tr>
          <tr key={report.id}>
            <td>
              Creation Date:{' '}
              {moment(report.created_on).format('MM/DD/YY HH:MM')}
            </td>
          </tr>

          <tr key={report.id}>
            <td>Song: {report.title}</td>
          </tr>
          <tr>
            <td>Artist: {report.artist}</td>
          </tr>

          <tr key={report.id}>
            <td>Reason: {report.reason}</td>
          </tr>
          <br />
          <br />
        </table>
      ))}
    </>
  )
}

router.get(
  '/dashboard',
  auth.requiresPermission('moderate:songs'),
  async (req, res) => {
    const unprocessedReports = await getUnprocessedReports()
    const processedReports = await getProcessedReports()

    res.send(
      renderToStaticMarkup(
        <Layout>
          <main>
            <ul>
              Unprocessed: {getReports(unprocessedReports)}
              <br />
              Processed: {getReports(processedReports)}
            </ul>
          </main>
        </Layout>
      )
    )
  }
)

export default router
