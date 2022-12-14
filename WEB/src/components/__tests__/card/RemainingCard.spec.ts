import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useCardStore } from '@/stores/card'

import RemainingCard from '@/components/card/RemainingCard.vue'

describe('RemainingCard.vue Test with empty data store', () => {
  let wrapper: any = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(RemainingCard, {
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
    expect(wrapper.findAll('div').length).toEqual(3)

    expect(wrapper.findAll('p').length).toEqual(1)
  })
})
