import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import AddUserExcel from '@/components/users/AddUserExcel.vue'

describe('AddUserExcel.vue Test with empty data store', () => {
  let wrapper: any = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(AddUserExcel, {
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
    expect(wrapper.findAll('form').length).toEqual(0)

    expect(wrapper.findAll('div').length).toEqual(2)

    expect(wrapper.findAll('input').length).toEqual(1)

    expect(wrapper.findAll('button').length).toEqual(0)

    expect(wrapper.findAll('p').length).toEqual(0)

    expect(wrapper.findAll('label').length).toEqual(0)

    expect(wrapper.findAll('img').length).toEqual(0)

    // expect(wrapper.get('button').text()).toEqual('Ajouter')

    expect(wrapper.get('input[name="file"]').element.value).toEqual('')
  })
})
