import { shallowMount, mount } from '@vue/test-utils'

import ChooseActivities from '@/components/activities/ChooseActivities.vue'
import { beforeEach, describe, expect, test } from 'vitest'

describe('ChooseActivities.vue', () => {
  let wrapper: any = null

  beforeEach(() => {
    wrapper = mount(ChooseActivities)
  })

  test('Number of div', () => {
    expect(wrapper.findAll('div').length).toEqual(11)
  })

  test('Number of h2', () => {
    expect(wrapper.findAll('h1').length).toEqual(1)
  })

  test('Number of p', () => {
    expect(wrapper.findAll('p').length).toEqual(1)
  })

  test('Number of button', () => {
    expect(wrapper.findAll('button').length).toEqual(0)
  })

  test('Number of img', () => {
    expect(wrapper.findAll('img').length).toEqual(2)
  })
})
