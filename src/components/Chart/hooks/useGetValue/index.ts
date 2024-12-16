import { useEffect, useState } from 'react'

function useGetValue(init: number) {
  const [y, setY] = useState(init)

  useEffect(() => {
    const interval = setInterval(() => {
      setY(Math.floor(Math.random() * 1001) - 500)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return y
}

export default useGetValue
