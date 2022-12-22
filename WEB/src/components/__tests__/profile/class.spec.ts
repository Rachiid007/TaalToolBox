import { shallowMount, mount } from '@vue/test-utils'
import Class from '@/components/profile/Class.vue'
import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest'
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
describe('Profile.vue', () => {
  test('Number of button', async () => {
    const wrapper = await mountSuspense(Class)
    expect(wrapper.findAll('div').length).toEqual(4)
  })

  test('Number of div', async () => {
    const wrapper = await mountSuspense(Class)
    expect(wrapper.find('.title').text()).toEqual('Classe')
  })
})
