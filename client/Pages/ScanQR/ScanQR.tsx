import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { useNavigate } from 'react-router-dom'
import { as } from 'vitest/dist/reporters-5f784f42.js'

function ScanQR() {
  const navigate = useNavigate()
  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            navigate(`/confirm-scan/${result.text}`)
          }

          if (error) {
            console.info(error)
          }
        }}
        style={{ width: '100%' }}
      />
      <p></p>
    </>
  )
}

export default ScanQR
