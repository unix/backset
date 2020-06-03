import React, { useEffect, useRef, useState } from 'react'
import { mount } from 'enzyme'
import Backset from 'packages'

describe('with-state', () => {
  it('all props of component should be work', () => {
    const { withContext, useStores } = Backset.create({
      test: 'test-value',
    })
    const MockComponent: React.FC<{ name: string }> = ({ name }) => {
      const { test } = useStores()
      return (
        <span id="test">
          {test}
          {name}
        </span>
      )
    }
    const MockWrapper = withContext(MockComponent)
    const wrapper = mount(<MockWrapper name="allprops" />)
    expect(wrapper.find('#test').text()).toContain('allprops')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const { withContext, useStores } = Backset.create({
      test: 'test-value',
    })
    const MockComponent: React.FC<{ name: string; forwardRef: React.RefObject<any> }> = ({
      name,
      forwardRef,
    }) => {
      const { test } = useStores()
      return (
        <span id="test" ref={forwardRef}>
          {test}
          {name}
        </span>
      )
    }
    const MockWrapper = () => {
      const Component = withContext(MockComponent)
      const ref = useRef<HTMLElement>(null)
      const [showRef, setShowRef] = useState<boolean>(false)
      useEffect(() => {
        if (ref.current) {
          setShowRef(true)
        }
      }, [ref.current])
      return (
        <p>
          <Component name="name" ref={ref} />
          <span id="current">{showRef ? 'ref' : 'none'}</span>
        </p>
      )
    }
    const wrapper = mount(<MockWrapper />)
    expect(wrapper.find('#current').text()).toEqual('ref')
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
