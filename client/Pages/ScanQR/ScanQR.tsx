import { QrReader } from 'react-qr-reader'
import { useNavigate } from 'react-router-dom'

function ScanQR() {
  const navigate = useNavigate()
  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            navigate(`/confirm-scan/${result.getText()}`)
          }

          if (error) {
            console.info(error)
          }
        }}
        constraints={{ facingMode: 'user' }}
      />
    </>
  )
}

export default ScanQR
