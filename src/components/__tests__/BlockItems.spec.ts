import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BlockItems from '../BlockItems.vue'

describe('BlockItems.vue', () => {
  it('renders slots correctly', () => {
    const wrapper = mount(BlockItems, {
      slots: {
        default: '<div class="test-div">Hello World</div>',
        bottom: '<p class="test-p">Test paragraph</p>'
      }
    })
    expect(wrapper.find('.test-div').text()).toBe('Hello World')
    expect(wrapper.find('.test-p').text()).toBe('Test paragraph')
  })
})
