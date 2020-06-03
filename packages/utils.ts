import React, { Dispatch, SetStateAction, MutableRefObject } from 'react'

export type UpdateActions<T> = {
  [key in keyof T]: Dispatch<SetStateAction<T[key]>>
}

export const makeInitialUpdates = <T>(states: T) => {
  const keys = Object.keys(states) as Array<keyof T>
  return keys.reduce(
    (pre, name) => ({
      ...pre,
      [name]: () => {},
    }),
    {},
  ) as UpdateActions<T>
}

export type StateRefs<T> = {
  [key in keyof T]: MutableRefObject<T[key]>
}

export const makeInitialRefs = <T>(states: T) => {
  const keys = Object.keys(states) as Array<keyof T>
  return keys.reduce(
    (pre, name) => ({
      ...pre,
      [name]: React.createRef(),
    }),
    {},
  ) as StateRefs<T>
}

export const generateRandomString = () => {
  return `r${Math.random().toString(32).slice(2, 10)}`
}
