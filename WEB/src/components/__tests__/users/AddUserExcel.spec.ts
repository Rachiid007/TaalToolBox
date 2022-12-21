import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AddUserExcel from '@/components/users/AddUserExcel.vue'
import { flushPromises } from '@vue/test-utils'
import { defineComponent } from 'vue'
import axios from 'axios'

describe('AddUserExcel.vue Test with empty data store', async () => {
  let wrapper: any = null
  // SETUP - run prior to each unit test
  beforeEach(async () => {
    // jest.spyOn(axios, 'get').mockResolvedValue({ data: 'some mocked data!' })
    vi.spyOn(axios, 'get').mockResolvedValue({ data: 'some mocked data' })
    const AddUserExcelAsync = defineComponent({
      components: { AddUserExcel },
      template: '<Suspense><AddUserExcel/></Suspense>'
    })
    // render the component
    wrapper = shallowMount(AddUserExcelAsync, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    await flushPromises()
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with zero elements displayed', () => {
    expect(wrapper.findAll('form').length).toEqual(0)

    const divNumber = wrapper.findAll('div').length

    console.log(divNumber)
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
