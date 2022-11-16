import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing' // <-- !!
// import { useCardStore } from '@/stores/card'

import dragndropteacher from '@/components/testDragNDrop/dragndropteacher.vue'

describe('DragAndDropTeacher.vue Test with empty data store', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(dragndropteacher, {
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
    expect(wrapper.findAll('div').length).toEqual(18)

    expect(wrapper.findAll('p').length).toEqual(10)
  })
})
