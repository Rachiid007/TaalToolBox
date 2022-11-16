import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCardStore } from '@/stores/card' // <-- !!

describe('Data Store Test', () => {
  let store = null

  beforeEach(() => {
    // create a fresh Pinia instance and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())

    // create an instance of the data store
    store = useCardStore()
  })

  it('initializes with zero cities', () => {
    expect(store.tableCard).toEqual([])
  })

  // it('initializes with correct values', () => { ... })
  // it('test adding a new city', () => { ...})
  // it('test adding a duplicate city', () => { ... })
  // it('test removing all cities', () => { ... })
})
