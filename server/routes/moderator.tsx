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
      <ul>
        {reports.map((report: any) => (
          <table key={report.id}>
            <tr key={report.id}>
              <td>
                User: {report.first_name} {report.last_name}
              </td>
            </tr>
            <br />
            <tr key={report.id}>
              <td>
                Creation Date:{' '}
                {moment(report.created_on).format('MM/DD/YY HH:MM')}
              </td>
            </tr>
            <br />
            <tr key={report.id}>
              <td>
                Song: {report.title}
                Artist: {report.artist}
              </td>
            </tr>
            <br />
            <tr key={report.id}>
              <td>Reason: {report.reason}</td>
            </tr>
            <br />
          </table>
        ))}
      </ul>
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
            Unprocessed: {getReports(unprocessedReports)}
            <br />
            <br />
            Processed: {getReports(processedReports)}
          </main>
        </Layout>
      )
    )
  }
)

export default router
