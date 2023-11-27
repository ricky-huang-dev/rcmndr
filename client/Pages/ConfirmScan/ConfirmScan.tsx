import { useParams } from 'react-router-dom'

function ConfirmScan() {
  const { code } = useParams()

  return <div>{code}</div>
}

export default ConfirmScan
