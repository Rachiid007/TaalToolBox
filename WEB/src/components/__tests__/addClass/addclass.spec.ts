import { shallowMount, mount, VueWrapper } from '@vue/test-utils'
import AddClass from '@/components/Add classes/AddClass.vue'
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

describe('AddClass.vue', () => {
    let wrapper: any = null

    beforeEach(() => {
        wrapper = shallowMount(AddClass, {
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

      it('initializes with first page displayed', () => {
        expect(wrapper.findAll('div').length).toEqual(7)
    
        expect(wrapper.findAll('p').length).toEqual(2)
    
        expect(wrapper.findAll('button').length).toEqual(1)
    
        expect(wrapper.findAll('img').length).toEqual(1)

        expect(wrapper.findAll('input').length).toEqual(1)

        expect(wrapper.findAll('body').length).toEqual(0)

        expect(wrapper.findAll('form').length).toEqual(1)
      })
})