/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AddCardForm from '@/components/card/add/AddCardForm.vue'

describe('AddCardForm', () => {
  it('should render', () => {
    const wrapper = mount(AddCardForm)
    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)

    expect(wrapper.find('input').attributes('placeholder')).toBe('Card name')
    expect(wrapper.find('button').text()).toBe('Add')

    expect(wrapper.find('input').element.value).toBe('')
  })
})
