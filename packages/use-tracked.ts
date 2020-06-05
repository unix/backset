import useStateRef from './use-state-ref'
import { ContextableStates } from './create'

const pickTrackedValues = <T extends ContextableStates>(values: T, keys: Array<keyof T>) => {
  return Object.keys(values).reduce((pre, key) => {
    if (!keys.includes(key)) return pre
    return {
      ...pre,
      [key]: values[key],
    }
  }, {}) as { [key in typeof keys[number]]: T[key] }
}

const makeUseTracked = <T extends ContextableStates>(initialValues: T, eventName: string) => {
  return (trackingKeys: Array<keyof T>) => {
    const [selected, setSelected, selectedRef] = useStateRef<
      { [key in typeof trackingKeys[number]]: T[key] }
    >(() => pickTrackedValues(initialValues, trackingKeys))

    if (typeof window !== 'undefined') {
      window.addEventListener(eventName, (event: CustomEvent<T>) => {
        const nextValue = event.detail

        const hasChanged = trackingKeys.some(key => selectedRef.current[key] !== nextValue[key])
        if (hasChanged) {
          setSelected(pickTrackedValues(nextValue, trackingKeys))
        }
      })
    }
    return selected
  }
}

export default makeUseTracked
