import { mount } from '@vue/test-utils'
import { BButton, BSpinner } from 'bootstrap-vue'
import SpinnerButton from '@/components/elements/SpinnerButton'

describe('SpinnerButton', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(SpinnerButton, {
      stubs: { BButton, BSpinner },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
