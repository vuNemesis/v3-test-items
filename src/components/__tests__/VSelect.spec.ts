import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import VSelect from '../VSelect.vue'

describe('VSelect', () => {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]

  const item = { id: 1, name: 'Item 1' }

  it('renders the items with the correct props', () => {
    const itemsParams = []

    const wrapper = mount(VSelect, {
      props: { items },
      slots: {
        item: (params) => itemsParams.push(params)
      }
    })

    expect(itemsParams).toHaveLength(items.length)

    itemsParams.forEach((itemParams, index) => {
      const item = items[index]
      expect(itemParams.item).toEqual(item)
      expect(itemParams.selected).toBe(false)
      expect(itemParams.disabled).toBe(false)
    })
  })

  it('selects one item when not in multiple mode', async () => {
    const wrapper = mount(VSelect, {
      props: {
        items
      }
    })

    await wrapper.vm.select(items[0])
    expect(wrapper.emitted('update:modelValue')).toEqual([[items[0]]])
  })

  it('selects two items in multiple mode', async () => {
    const modelValue = []
    const wrapper = mount(VSelect, {
      props: {
        multiple: true,
        modelValue,
        items
      }
    })

    await wrapper.vm.select(items[0])
    await wrapper.vm.select(items[3])
    expect(wrapper.emitted('update:modelValue')).toEqual([[[items[0]]], [[items[3]]]])
  })

  it('renders the items as selected if they are in the modelValue', async () => {
    const itemsParams = []
    const modelValue = items.slice(0, 2)

    mount(VSelect, {
      props: {
        multiple: true,
        items,
        modelValue
      },
      slots: {
        item: (params) => itemsParams.push(params)
      }
    })

    expect(itemsParams).toHaveLength(items.length)

    itemsParams.forEach((itemParams, index) => {
      const item = items[index]
      expect(itemParams.selected).toBe(modelValue.includes(item))
      expect(itemParams.disabled).toBe(false)
    })
  })

  it('renders the items as disabled if they are not in the modelValue and maximum number of selections is exceeded', async () => {
    const itemsParams = []
    const modelValue = items.slice(0, 3)

    mount(VSelect, {
      props: {
        max: 3,
        multiple: true,
        items,
        modelValue
      },
      slots: {
        item: (params) => itemsParams.push(params)
      }
    })

    expect(itemsParams).toHaveLength(items.length)

    itemsParams.forEach((itemParams, index) => {
      const item = items[index]
      expect(itemParams.selected).toBe(modelValue.includes(item))
      expect(itemParams.disabled).toBe(!modelValue.includes(item))
    })
  })
})
