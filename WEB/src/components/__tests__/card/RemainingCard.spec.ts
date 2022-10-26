import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RemainingCard from '../../card/RemainingCard.vue'

describe('RemainingCard', () => {
  it('renders properly', () => {
    const wrapper = mount(RemainingCard, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
