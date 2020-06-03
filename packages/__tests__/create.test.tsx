import React from 'react'
import { mount } from 'enzyme'
import Backset from 'packages'

describe('create', () => {
  it('initial values should be returned', () => {
    const { withContext, useStores } = Backset.create({
      test: 'test-value',
    })
    const MockComponent = () => {
      const { test } = useStores()
      return <span id="value">{test}</span>
    }
    const MockWrapper = withContext(MockComponent)
    const wrapper = mount(<MockWrapper />)

    expect(wrapper.find('#value').text()).toEqual('test-value')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work correctly with object and array', () => {
    const { withContext, useStores } = Backset.create({
      object: { val: 'test-value' },
      array: ['test1', 'test2'],
    })
    const MockComponent = () => {
      const { object, array } = useStores()
      return (
        <p>
          <span id="object">{object.val}</span>
          <span id="array">{JSON.stringify(array)}</span>
        </p>
      )
    }
    const MockWrapper = withContext(MockComponent)
    const wrapper = mount(<MockWrapper />)

    expect(wrapper.find('#object').text()).toEqual('test-value')
    expect(wrapper.find('#array').text()).toContain('test1')
    expect(wrapper.find('#array').text()).toContain('test2')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work correctly without initial values', () => {
    const { withContext, useStores } = Backset.create()
    const MockWrapper = withContext(() => {
      const { test } = useStores()
      return <span>{test}</span>
    })
    const wrapper = mount(<MockWrapper />)

    expect(() => wrapper.unmount()).not.toThrow()
  })
})
