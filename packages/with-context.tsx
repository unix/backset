import React from 'react'

export type WithStateProps = {
  forwardRef: React.Ref<any>
  contextable: any
}

export type ExcludeStatePropsProps<P> = Pick<P, Exclude<keyof P, keyof WithStateProps>>

const makeWithContext = (Provider: React.ComponentType) => {
  return <P,>(Component: React.ComponentType<P>) => {
    const forwardComponent = React.forwardRef<any, ExcludeStatePropsProps<P>>(
      (props: P, ref: React.RefObject<any>) => (
        <Provider>
          <Component {...props} forwardRef={ref} />
        </Provider>
      ),
    )

    if (process.env.NODE_ENV !== 'production') {
      const name = Component.displayName || Component.name || 'Unknown'
      forwardComponent.displayName = `withState${name}`
    }

    return forwardComponent
  }
}

export default makeWithContext
