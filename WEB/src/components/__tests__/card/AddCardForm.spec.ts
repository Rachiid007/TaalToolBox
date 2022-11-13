import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AddCardForm from '../../card/add/AddCardForm.vue'

describe('AddCardForm', async () => {
  it('should render', () => {
    const wrapper = mount(AddCardForm)
  })
})
