import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import ButtonValidation from '@/components/card/ButtonValidation.vue'

describe('RemainingCard.vue Test with empty data store', () => {
  let wrapper: any = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(ButtonValidation, {
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
    expect(wrapper.findAll('div').length).toEqual(1)

    expect(wrapper.findAll('button').length).toEqual(3)
  })
})
