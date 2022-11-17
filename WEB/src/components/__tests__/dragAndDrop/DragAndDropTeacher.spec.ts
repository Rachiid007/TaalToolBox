import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing' // <-- !!
// import { useCardStore } from '@/stores/card'

import DragNDropTeacher from '@/components/dragndrop/DragNDropTeacher.vue'

describe('DragNDropTeacher.vue Test with empty data store', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(DragNDropTeacher, {
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
    expect(wrapper.findAll('div').length).toEqual(21)

    expect(wrapper.findAll('p').length).toEqual(11)

    expect(wrapper.findAll('button').length).toEqual(4)

    expect(wrapper.findAll('img').length).toEqual(5)

    expect(wrapper.findAll('input').length).toEqual(4)
  })
})
