import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWord from '../HelloWord.vue'

describe('HelloWord', () => {
  it('should render', () => {
    const wrapper = mount(HelloWord)
  })
})
