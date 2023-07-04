import { useCallback, useEffect, useRef, useState } from "react"

export const useDebounce = (cb: (query: string) => void, interval: number) => {
   const [query, setQuery] = useState<string>("")
   const cbRef = useRef(cb)
   const timeoutRef = useRef<number>()

   useEffect(() => {
      cbRef.current = cb
   }, [cb])

   const set = useCallback(() => {
      timeoutRef.current = setTimeout(() => cbRef.current(query), interval)
   }, [interval, query])

   const reset = useCallback(() => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
   },[])

   useEffect(() => {
      reset()
      set()
   }, [query, reset, set])
   useEffect(() => {
      reset()

   }, [reset])

   return [setQuery]
}
