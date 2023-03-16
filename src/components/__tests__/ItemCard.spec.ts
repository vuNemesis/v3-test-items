import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ItemCard from '../ItemCard.vue'

describe('ItemCard', () => {
  const item = { id: 1, name: 'Item 1' }

  it('renders properly', () => {
    const wrapper = mount(ItemCard, { props: { item } })

    expect(wrapper.text()).toContain('Item 1')
    expect(wrapper.classes()).not.toContain('item_selected')
    expect(wrapper.classes()).not.toContain('item_disabled')
  })

  it('prop selected true', () => {
    const wrapper = mount(ItemCard, { props: { item, selected: true } })

    expect(wrapper.classes()).toContain('item_selected')
  })

  it('prop disabled true', () => {
    const wrapper = mount(ItemCard, { props: { item, disabled: true } })

    expect(wrapper.classes()).toContain('item_disabled')
  })

  it('emits an event when clicked', () => {
    const wrapper = mount(ItemCard, { props: { item } })

    wrapper.find('div.item').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
