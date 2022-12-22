import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing' // <-- !!
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
// import { useCardStore } from '@/stores/card'
import { defineComponent, Suspense, h } from 'vue'
import DadTeacherView from '@/views/dad/DadTeacherView.vue'
import DragNDropTeacher from '@/components/dragndrop/DragNDropTeacher.vue'
import DragNDropResume from '@/components/dragndrop/DragNDropResume.vue'
import HowToAddDad from '@/components/dragndrop/HowToAddDad.vue'
import SelectDragNDropImage from '@/components/dragndrop/SelectDragNDropImage.vue'

import { useDadLevels } from '@/stores/dadLevels'
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
describe('DragNDropTeacher.vue test with initialization', () => {
  let store: any = null

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDadLevels()
    store.setImageUrl('/form1.png')
  })

  test('initializes with first page displayed', async () => {
    const wrapper = await mountSuspense(DadTeacherView)
    expect(wrapper.findAll('div').length).toEqual(14)

    expect(wrapper.findAll('p').length).toEqual(5)

    expect(wrapper.findAll('button').length).toEqual(1)

    expect(wrapper.findAll('img').length).toEqual(6)
  })

  test('swap to second page', async () => {
    const wrapper = await mountSuspense(DadTeacherView)
    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.findAll('p').length).toEqual(3)

    expect(wrapper.findAll('input').length).toEqual(1)

  })
})
