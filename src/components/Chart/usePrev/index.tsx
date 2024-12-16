import { useEffect, useRef } from 'react'

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value // Assign the value of ref to the argument
  }, [value]) // This code will run when the value of 'value' changes
  return ref.current // In the end, return the current ref value.
}

export default usePrevious
