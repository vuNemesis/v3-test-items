import { describe, it, expect } from 'vitest'
import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import type { ComponentPublicInstance } from 'vue'

import type Item from '../../types/Item'
import VSelect from '../VSelect.vue'

type VSelectProps = any
type VSelectMethods = {
  select: (item: Item) => void
}

type VSelectWrapperType = VueWrapper<ComponentPublicInstance<VSelectProps, VSelectMethods>>

interface ItemProps {
  item: Item
  selected: boolean
  disabled: boolean
}

describe('VSelect', () => {
  const items: Item[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]

  it('renders the items with the correct props', () => {
    const itemsProps: ItemProps[] = []

    shallowMount(VSelect, {
      props: { items },
      slots: {
        item: (params) => itemsProps.push(params)
      }
    })

    expect(itemsProps).toHaveLength(items.length)

    itemsProps.forEach((itemProps, index) => {
      const item = items[index]
      expect(itemProps.item).toEqual(item)
      expect(itemProps.selected).toBe(false)
      expect(itemProps.disabled).toBe(false)
    })
  })

  it('selects one item when not in multiple mode', async () => {
    const wrapper: VSelectWrapperType = shallowMount(VSelect, {
      props: {
        items
      }
    })

    await wrapper.vm.select(items[0])
    expect(wrapper.emitted('update:modelValue')).toEqual([[items[0]]])
  })

  it('selects two items in multiple mode', async () => {
    const modelValue: Item[] = []

    const wrapper: VSelectWrapperType = mount(VSelect, {
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
    const itemsProps: ItemProps[] = []
    const modelValue: Item[] = items.slice(0, 2)

    shallowMount(VSelect, {
      props: {
        multiple: true,
        items,
        modelValue
      },
      slots: {
        item: (params) => itemsProps.push(params)
      }
    })

    expect(itemsProps).toHaveLength(items.length)

    itemsProps.forEach((itemProps, index) => {
      const item = items[index]
      expect(itemProps.selected).toBe(modelValue.includes(item))
      expect(itemProps.disabled).toBe(false)
    })
  })

  it('renders the items as disabled if they are not in the modelValue and maximum number of selections is exceeded', async () => {
    const itemsProps: ItemProps[] = []
    const modelValue: Item[] = items.slice(0, 3)

    shallowMount(VSelect, {
      props: {
        max: 3,
        multiple: true,
        items,
        modelValue
      },
      slots: {
        item: (params) => itemsProps.push(params)
      }
    })

    expect(itemsProps).toHaveLength(items.length)

    itemsProps.forEach((itemProps, index) => {
      const item = items[index]
      expect(itemProps.selected).toBe(modelValue.includes(item))
      expect(itemProps.disabled).toBe(!modelValue.includes(item))
    })
  })
})
