import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'

export type CurrentStateType<S> = [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]

const useStateRef = <S>(initialState: S | (() => S)): CurrentStateType<S> => {
  const initialValue =
    typeof initialState === 'function' ? (initialState as () => S)() : initialState
  const [state, setState] = useState<S>(initialValue)
  const ref = useRef<S>(initialValue)

  useEffect(() => {
    ref.current = state
  }, [state])

  const setValue = (val: SetStateAction<S>) => {
    const result = typeof val === 'function' ? (val as (prevState: S) => S)(ref.current) : val
    ref.current = result
    setState(result)
  }

  return [state, setValue, ref]
}

export default useStateRef
