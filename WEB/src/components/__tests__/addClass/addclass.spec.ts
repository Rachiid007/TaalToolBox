import AddClass from '@/components/Add classes/AddClass.vue'
import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
// import { useCardStore } from '@/stores/card'
import { defineComponent, Suspense, h, defineAsyncComponent } from 'vue'
import { flushPromises } from '@vue/test-utils'

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
describe('App renderes', () => {
  test('Number of button', async () => {
    const wrapper = await mountSuspense(AddClass)
    expect(wrapper.findAll('div').length).toEqual(7)
  })

  test('Number of p', async () => {
    const wrapper = await mountSuspense(AddClass)
    expect(wrapper.findAll('p').length).toEqual(2)
  })
  test('Number of button', async () => {
    const wrapper = await mountSuspense(AddClass)
    expect(wrapper.findAll('button').length).toEqual(1)
  })

  test('Number of img', async () => {
    const wrapper = await mountSuspense(AddClass)
    expect(wrapper.findAll('img').length).toEqual(1)
  })
  test('Number of input', async () => {
    const wrapper = await mountSuspense(AddClass)
    expect(wrapper.findAll('input').length).toEqual(1)
  })
  test('Number of body', async () => {
    const wrapper = await mountSuspense(AddClass)
    expect(wrapper.findAll('body').length).toEqual(0)
  })
  test('Number of form', async () => {
    const wrapper = await mountSuspense(AddClass)
    expect(wrapper.findAll('form').length).toEqual(1)
  })
})
