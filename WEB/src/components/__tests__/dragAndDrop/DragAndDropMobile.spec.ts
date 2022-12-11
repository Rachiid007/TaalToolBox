import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing' // <-- !!
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
// import { useCardStore } from '@/stores/card'

import DragNDropMobile from '@/components/dragndrop/DragNDropMobile.vue'
import { useDadLevels } from '@/stores/dadLevels'

describe('DragNDropTeacher.vue test with initialization', () => {
  let wrapper: any = null
  let store: any = null

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDadLevels()
    store.setImageUrl('/form1.png')
    store.setLevel(1)
    wrapper = mount(DragNDropMobile)
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with zero elements added', () => {
    // store.setLevel(1)
    // console.log(store.getLevel())

    expect(wrapper.findAll('button').length).toEqual(1)

    expect(wrapper.findAll('img').length).toEqual(1)

    expect(wrapper.findAll('select').length).toEqual(store.getData()[1]['fields']['mobile'].length)

    expect(wrapper.findAll('.result')[0].text()).toEqual(
      '0 / ' + store.getData()[1]['fields']['mobile'].length
    )
  })
})
describe('DragNDropTeacher.vue test with initialization with no mobile version', () => {
  let wrapper: any | null = null
  let store: any = null

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDadLevels()
    store.setLevel(0)
    wrapper = mount(DragNDropMobile)
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with no mobile version available', async () => {
    expect(wrapper.findAll('button').length).toEqual(0)

    expect(wrapper.findAll('p').length).toEqual(1)

    expect(wrapper.findAll('h1').length).toEqual(1)
  })
})
