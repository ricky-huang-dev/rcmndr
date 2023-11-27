import { useEffect } from 'react'

export default function useUpdateTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
