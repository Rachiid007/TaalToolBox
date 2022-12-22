import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AddUserExcel from '@/components/users/AddUserExcel.vue'
import { flushPromises } from '@vue/test-utils'
import { defineComponent, Suspense, h } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { defineStore, setActivePinia, createPinia } from 'pinia'

const mountSuspense = async (component: any) => {
  const wrapper = mount(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(component),
          fallback: h('div', 'fallback')
        })
      }
    }),
    {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    }
  )

  await flushPromises()
  return wrapper
}
// TEARDOWN - run after each unit test
describe('App renderes', () => {
  test('Number of div', async () => {
    const wrapper = await mountSuspense(AddUserExcel)
    expect(wrapper.findAll('div').length).toEqual(2)
  })
  test('Number of input', async () => {
    const wrapper = await mountSuspense(AddUserExcel)
    expect(wrapper.findAll('input').length).toEqual(1)
  })
  test('Number of button', async () => {
    const wrapper = await mountSuspense(AddUserExcel)
    expect(wrapper.findAll('button').length).toEqual(0)
  })
  test('Number of button', async () => {
    const wrapper = await mountSuspense(AddUserExcel)
    expect(wrapper.findAll('p').length).toEqual(0)
  })
  test('Number of label', async () => {
    const wrapper = await mountSuspense(AddUserExcel)
    expect(wrapper.findAll('label').length).toEqual(0)
  })
  test('Number of img', async () => {
    const wrapper = await mountSuspense(AddUserExcel)
    expect(wrapper.findAll('img').length).toEqual(0)
  })
})
