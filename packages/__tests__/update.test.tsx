import React, { useEffect } from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Backset from 'packages'
import { nativeEvent } from 'tests/utils'

const simulateClick = (wrapper: ReactWrapper, value: string) => {
  wrapper.simulate('click', {
    ...nativeEvent,
    target: { value },
  })
}

describe('update', () => {
  it('value should be updated', () => {
    const { withContext, useStores, useUpdates } = Backset.create({
      test: 'test-value1',
    })
    const MockComponent = () => {
      const { test } = useStores()
      const updates = useUpdates()
      useEffect(() => {
        updates.test('test-value2')
      }, [])
      return <span id="value">{test}</span>
    }
    const MockWrapper = withContext(MockComponent)
    const wrapper = mount(<MockWrapper />)

    expect(wrapper.find('#value').text()).toEqual('test-value2')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('updates should be shared across components', () => {
    const { withContext, useStores, useUpdates } = Backset.create({
      test: 'test-value1',
    })
    const MockComponent1 = () => {
      const updates = useUpdates()
      const handler = (e: any) => updates.test(e.target.value as string)
      return <button onClick={handler} id="btn" />
    }
    const MockComponent2 = () => {
      const { test } = useStores()
      return <span id="value">{test}</span>
    }
    const MockWrapper = withContext(() => {
      return (
        <div>
          <MockComponent1 />
          <MockComponent2 />
        </div>
      )
    })
    const wrapper = mount(<MockWrapper />)
    const btn = wrapper.find('#btn')
    simulateClick(btn, 'value2')
    expect(wrapper.find('#value').text()).toEqual('value2')

    simulateClick(btn, 'value3')
    expect(wrapper.find('#value').text()).toEqual('value3')

    simulateClick(btn, 'value4')
    expect(wrapper.find('#value').text()).toEqual('value4')

    expect(() => wrapper.unmount()).not.toThrow()
  })
})
