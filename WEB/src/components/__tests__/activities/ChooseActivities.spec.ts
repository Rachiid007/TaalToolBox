import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

import ChooseActivities from '@/components/activity/ChooseActivities.vue'
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

describe('ChooseActivities.vue', () => {
  let wrapper: any = null

  beforeEach(() => {
    wrapper = shallowMount(ChooseActivities, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('Number of div', () => {
    expect(wrapper.findAll('div').length).toEqual(0)
  })

  it('Number of h2', () => {
    expect(wrapper.findAll('h1').length).toEqual(0)
  })

  it('Number of p', () => {
    expect(wrapper.findAll('p').length).toEqual(0)
  })

  it('Number of button', () => {
    expect(wrapper.findAll('button').length).toEqual(0)
  })

  it('Number of img', () => {
    expect(wrapper.findAll('img').length).toEqual(0)
  })
})
