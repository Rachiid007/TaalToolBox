import { shallowMount, mount } from '@vue/test-utils'
import Profile from '@/components/profile/Profile.vue'
import { beforeEach, describe, expect, test } from 'vitest'



describe('Profile.vue', () => {
    let wrapper: any | null = null;

    beforeEach(() => {
        wrapper = mount(Profile)
    })

    test("number of divs", () => {
        expect(wrapper.findAll("div").length).toEqual(6)
    })

    test("number of images", () => {
        expect(wrapper.findAll("img").length).toEqual(4)
    })

    test("number of paragraphs", () => {
        expect(wrapper.findAll("p").length).toEqual(3)
    })
    test("text of the name div", () => {
        expect(wrapper.find(".name").text()).toEqual("Nom utilisateur")
    })
})