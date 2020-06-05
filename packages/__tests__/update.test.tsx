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

  it('components should be treacked', () => {
    let renderCount = 0
    const { withContext, useTracked, useUpdates } = Backset.create({
      test: 'value1',
      other: 0,
    })
    const MockComponent1 = () => {
      const { test, other } = useUpdates()
      return (
        <div>
          <button onClick={e => test((e.target as any).value)} id="btn" />
          <button onClick={() => other(last => last + 1)} id="other" />
        </div>
      )
    }
    const MockComponent2 = () => {
      const { test } = useTracked(['test'])
      useEffect(() => {
        renderCount++
      })
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
    expect(wrapper.find('#value').text()).toEqual('value1')
    expect(renderCount).toBe(1)

    const btn = wrapper.find('#btn')
    simulateClick(btn, 'value2')
    expect(wrapper.find('#value').text()).toEqual('value2')
    expect(renderCount).toBe(2)

    const otherButton = wrapper.find('#other')
    simulateClick(otherButton, '')
    simulateClick(otherButton, '')
    simulateClick(otherButton, '')
    expect(wrapper.find('#value').text()).toEqual('value2')
    expect(renderCount).toBe(2)
  })
})
