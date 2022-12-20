import { shallowMount, mount } from '@vue/test-utils'
import Success from '@/components/profile/Success.vue'
import { beforeEach, describe, expect, test } from 'vitest'



describe('success.vue', () => {
    let wrapper: any | null = null;

    beforeEach(() => {
        wrapper = mount(Success)
    })

    test("number of divs", () => {
    
        expect(wrapper.findAll("div").length).toEqual(3)
        
    })

   
})