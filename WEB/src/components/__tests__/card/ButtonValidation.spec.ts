import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { defineComponent, Suspense, h, defineAsyncComponent } from 'vue'
import { flushPromises } from '@vue/test-utils'
import ButtonValidationVue from '@/components/card/ButtonValidation.vue'

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
    const wrapper = await mountSuspense(ButtonValidationVue)
    expect(wrapper.findAll('div').length).toEqual(1) // it works
  })
  test('Number of button', async () => {
    const wrapper = await mountSuspense(ButtonValidationVue)
    expect(wrapper.findAll('button').length).toEqual(3)
  })
})
