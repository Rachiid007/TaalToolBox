import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
// import { useCardStore } from '@/stores/card'
import { defineComponent, Suspense, h, defineAsyncComponent } from 'vue'
import MainCard from '@/components/card/MainCard.vue'
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
    const wrapper = await mountSuspense(MainCard)
    expect(wrapper.findAll('button').length).toEqual(1) // it works
  })

  test('Number of div', async () => {
    const wrapper = await mountSuspense(MainCard)
    expect(wrapper.findAll('div').length).toEqual(5) // it works
  })
  test('Number of img', async () => {
    const wrapper = await mountSuspense(MainCard)
    expect(wrapper.findAll('img').length).toEqual(1) // it works
  })

  test('Number of p', async () => {
    const wrapper = await mountSuspense(MainCard)
    expect(wrapper.findAll('p').length).toEqual(2) // it works
  })
})
