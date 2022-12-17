import { shallowMount, mount } from '@vue/test-utils'
import Class from '@/components/profile/Class.vue'
import { beforeEach, describe, expect, test } from 'vitest'

describe('Profile.vue', () => {
    let wrapper: any | null = null;

    beforeEach(() => {
        wrapper = mount(Class)
    })

    test("number of divs", () =>{
        expect(wrapper.findAll("div").length).toEqual(4)
    })

    test("text of the name div", () => {
        expect(wrapper.find(".title").text()).toEqual("Classe")
    })

})
