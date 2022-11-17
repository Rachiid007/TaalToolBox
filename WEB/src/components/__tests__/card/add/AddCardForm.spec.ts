import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useCardStore } from '@/stores/card'

import AddCardForm from '@/components/card/add/AddCardForm.vue'

describe('AddCardForm.vue Test with empty data store', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(AddCardForm, {
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
    expect(wrapper.findAll('form').length).toEqual(1)

    expect(wrapper.findAll('div').length).toEqual(1)

    expect(wrapper.get('h2').text()).toEqual('Ajouter une carte')

    expect(wrapper.findAll('input').length).toEqual(3)

    expect(wrapper.findAll('button').length).toEqual(1)

    expect(wrapper.findAll('p').length).toEqual(0)

    expect(wrapper.findAll('label').length).toEqual(3)

    expect(wrapper.findAll('img').length).toEqual(0)

    expect(wrapper.get('button').text()).toEqual('Ajouter')

    expect(wrapper.get('input[name="word"]').element.value).toEqual('')

    expect(wrapper.get('input[name="translation"]').element.value).toEqual('')

    expect(wrapper.get('input[name="image"]').element.value).toEqual('')
  })
})
