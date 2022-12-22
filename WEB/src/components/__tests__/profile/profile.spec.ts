import Profile from '@/components/profile/Profile.vue'
import { beforeEach, describe, expect, test, vi } from 'vitest'
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

describe('Profile.vue', () => {
  test('Number of div', async () => {
    const wrapper = await mountSuspense(Profile)
    expect(wrapper.findAll('div').length).toEqual(6) // it works
  })

  test('Number of img', async () => {
    const wrapper = await mountSuspense(Profile)
    expect(wrapper.findAll('img').length).toEqual(4)
  })
  test('Number of p', async () => {
    const wrapper = await mountSuspense(Profile)
    expect(wrapper.findAll('p').length).toEqual(3)
  })

  test('Number of .name', async () => {
    const wrapper = await mountSuspense(Profile)
    expect(wrapper.find('.name').text()).toEqual('Nom utilisateur')
  })
})
