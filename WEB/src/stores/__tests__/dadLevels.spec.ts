import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDadLevels } from '@/stores/dadLevels' // <-- !!
import type { Component } from 'vue'
import type { Store } from "pinia"

describe('DadLevels Test', () => {
  let store: any | null= null

  beforeEach(() => {
    // create a fresh Pinia instance and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())

    // create an instance of the dadLevel Store
    store = useDadLevels()
  })

  it('Check the variables at initialsation', () => {
    expect(store.getTempData()).toEqual({ pc: [], mobile: [] })
  })
})
