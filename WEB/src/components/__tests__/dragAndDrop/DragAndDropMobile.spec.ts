import { describe, it, expect, vi, beforeEach, test, afterEach } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing' // <-- !!
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
// import { useCardStore } from '@/stores/card'

import DragNDropMobile from '@/components/dragndrop/DragNDropMobile.vue'
import { useDadLevels } from '@/stores/dadLevels'
import { defineComponent, Suspense, h } from 'vue'
import { flushPromises } from '@vue/test-utils'

const mountSuspense = async (component: any) => {
  const wrapper = shallowMount(
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
describe('DragNDropTeacher.vue test with initialization', async () => {
  let store: any = null

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDadLevels()
    store.setImageUrl('/form1.png')
    store.setLevel(1)
  })

  test('initializes with zero elements added', async () => {
    // store.setLevel(1)
    // console.log(store.getLevel())
    setActivePinia(createPinia())
    // store = useDadLevels()
    // store.setImageUrl('/form1.png')
    // store.setLevel(1)
    const wrapper = await mountSuspense(DragNDropMobile)
    expect(wrapper.findAll('button').length).toEqual(0)

    expect(wrapper.findAll('img').length).toEqual(0)

    // expect(wrapper.findAll('select').length).toEqual(store.getData()[1]['fields']['mobile'].length)

    // expect(wrapper.findAll('.result')[0].text()).toEqual(
    //   '0 / ' + store.getData()[1]['fields']['mobile'].length
    // )
  })
})
describe('DragNDropTeacher.vue test with initialization with no mobile version', () => {
  let store: any = null

  // beforeEach(() => {
  //   setActivePinia(createPinia())
  //   store = useDadLevels()
  //   store.setLevel(0)
  // })

  test('initializes with no mobile version available', async () => {
    const wrapper = await mountSuspense(DragNDropMobile)
    setActivePinia(createPinia())
    store = useDadLevels()
    store.setLevel(0)
    expect(wrapper.findAll('button').length).toEqual(0)

    expect(wrapper.findAll('p').length).toEqual(0)

    expect(wrapper.findAll('h1').length).toEqual(0)
  })
})
