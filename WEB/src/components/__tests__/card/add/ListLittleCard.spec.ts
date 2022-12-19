import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import ListLittleCard from '@/components/card/add/ListLittleCard.vue'

describe('AddCardForm.vue Test with empty data store', () => {
  let wrapper: any = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(ListLittleCard, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with zero elements displayed', () => {
    expect(wrapper.findAll('h2').length).toEqual(1)

    expect(wrapper.findAll('div').length).toEqual(2)

    expect(wrapper.findAll('p').length).toEqual(1)

    expect(wrapper.findAll('button').length).toEqual(1)
  })
})
