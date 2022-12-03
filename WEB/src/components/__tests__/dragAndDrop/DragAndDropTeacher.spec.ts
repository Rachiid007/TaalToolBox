import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing' // <-- !!
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
// import { useCardStore } from '@/stores/card'

import DadTeacherView from '@/views/dad/DadTeacherView.vue'
import DragNDropTeacher from '@/components/dragndrop/DragNDropTeacher.vue'
import DragNDropResume from '@/components/dragndrop/DragNDropResume.vue'
import HowToAddDad from '@/components/dragndrop/HowToAddDad.vue'
import SelectDragNDropImage from '@/components/dragndrop/SelectDragNDropImage.vue'

import { useDadLevels } from '@/stores/dadLevels'

describe('DragNDropTeacher.vue test with initialization', () => {
  let wrapper: any | null = null
  let store: any = null

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDadLevels()
    store.setImageUrl('/form1.png')
    wrapper = mount(DadTeacherView)
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  test('initializes with first page displayed', () => {
    expect(wrapper.findAll('div').length).toEqual(14)

    expect(wrapper.findAll('p').length).toEqual(5)

    expect(wrapper.findAll('button').length).toEqual(1)

    expect(wrapper.findAll('img').length).toEqual(6)
  })

  it('swap to second page', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.findAll('p').length).toEqual(3)

    expect(wrapper.findAll('input').length).toEqual(1)

    console.log(button)
  })
})
