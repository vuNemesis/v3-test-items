import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BlockItem from '../BlockItem.vue'

describe('BlockItem', () => {
  const item = { id: 1, name: 'Item 1' }

  it('render with item', () => {
    const wrapper = mount(BlockItem, { props: { item } })

    expect(wrapper.text()).toContain('Item 1')
    expect(wrapper.find('.item').exists()).toBe(true)
  })

  it('render without item', () => {
    const wrapper = mount(BlockItem)

    expect(wrapper.text()).not.toContain('Item 1')
    expect(wrapper.find('.item').exists()).toBe(false)
  })
})
