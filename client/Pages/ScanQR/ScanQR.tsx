import { useState } from 'react'
import { QrReader } from 'react-qr-reader'

function ScanQR() {
  const [data, setData] = useState('No result')
  return (
    <>
      <QrReader
        onResult={(result, error) => {
          console.log(result)
          if (result) {
            setData(result?.text)
          }

          if (error) {
            console.info(error)
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  )
}

export default ScanQR
