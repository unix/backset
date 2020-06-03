import React, { MutableRefObject, SetStateAction } from 'react'
import useStateRef from './use-state-ref'
import { makeInitialUpdates, generateRandomString, UpdateActions } from './utils'
import makeWithContext from './with-context'
import makeUseTracked from './use-tracked'

export interface ContextableStates {
  [key: string]: any
}

export type CurrentUpdateType<T> = SetStateAction<T[keyof T]>

const create = <T extends ContextableStates>(initialStates: T | (() => T) = {} as T) => {
  const initialValue =
    typeof initialStates === 'function' ? (initialStates as () => T)() : initialStates
  const keys = Object.keys(initialValue) as Array<keyof T>
  const Context = React.createContext<T>(initialValue)
  const eventName = `state_${generateRandomString()}`

  let updates = makeInitialUpdates(initialValue)
  let stateRefs = { current: initialValue } as MutableRefObject<T>

  const Provider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [state, setState, stateRef] = useStateRef<T>(initialValue)
    stateRefs = stateRef
    updates = keys.reduce((pre, name: keyof T) => {
      return {
        ...pre,
        [name]: (next: SetStateAction<CurrentUpdateType<T>>) => {
          let result = next as CurrentUpdateType<T>
          if (typeof next === 'function') {
            result = (next as (prevState: CurrentUpdateType<T>) => CurrentUpdateType<T>)(
              stateRef.current[name],
            )
          }
          const nextState = { ...stateRef.current, [name]: result }
          setState(nextState)
          if (typeof window !== 'undefined') {
            const updateEvent = new CustomEvent<T>(eventName, { detail: nextState })
            window.dispatchEvent(updateEvent)
          }
        },
      }
    }, {}) as UpdateActions<T>
    return <Context.Provider value={state}>{children}</Context.Provider>
  }
  const withContext = makeWithContext(Provider)
  return {
    Provider,
    withContext,
    useStores: () => React.useContext(Context),
    useUpdates: () => updates,
    useTracked: makeUseTracked(initialValue, eventName),
    useCurrentRefs: () => stateRefs,
  }
}

export default create
