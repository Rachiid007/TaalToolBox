import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing' // <-- !!
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
// import { useCardStore } from '@/stores/card'

import DragNDrop from '@/components/dragndrop/DragNDrop.vue'
import { useDadLevels } from '@/stores/dadLevels'

describe('DragNDropTeacher.vue test with initialization', () => {
  let wrapper: any | null = null
  let store: any = null

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDadLevels()
    store.setImageUrl('/form1.png')
    wrapper = mount(DragNDrop)
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with zero elements added', () => {
    expect(wrapper.findAll('button').length).toEqual(1)

    expect(wrapper.findAll('img').length).toEqual(1)

    expect(wrapper.findAll('p').length).toEqual(store.getData()[0]['fields']['pc'].length + 3)

    expect(wrapper.findAll('div').length).toEqual(store.getData()[0]['fields']['pc'].length + 8)

    expect(wrapper.findAll('.result')[0].text()).toEqual(
      '0 / ' + store.getData()[0]['fields']['pc'].length
    )
  })
})

describe('DragNDropTeacher.vue test with initialization with no pc version available', () => {
  let wrapper: any | null = null
  let store: any = null

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDadLevels()
    store.setImageUrl('/form1.png')
    store.setLevel(1)
    wrapper = mount(DragNDrop)
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with no pc version available', () => {
    expect(wrapper.findAll('button').length).toEqual(0)

    expect(wrapper.findAll('p').length).toEqual(1)

    expect(wrapper.findAll('h1').length).toEqual(1)
  })
})
