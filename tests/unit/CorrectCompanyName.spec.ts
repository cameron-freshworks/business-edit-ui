// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'

// Store
import { getVuexStore } from '@/store'

// Components
import { mount, Wrapper } from '@vue/test-utils'
import { CorrectCompanyName } from '@/components/Company/CompanyName'

Vue.use(Vuetify)

function getLastEvent (wrapper: Wrapper<CorrectCompanyName>, emitTag: string): any {
  const eventsList: Array<any> = wrapper.emitted(emitTag)
  const events: Array<any> = eventsList[eventsList.length - 1]
  return events[0]
}

describe('CorrectCompanyName', () => {
  let vuetify: any
  let wrapperFactory: any
  let store: any = getVuexStore()

  beforeEach(() => {
    vuetify = new Vuetify({})

    store.state.stateModel.nameRequest.legalName = 'Bobs Plumbing'

    wrapperFactory = (props) => {
      return mount(CorrectCompanyName, {
        propsData: {
          props
        },
        store,
        vuetify
      })
    }
  })

  it('renders the CorrectCompanyName Component', async () => {
    const wrapper = wrapperFactory()

    expect(wrapper.find(CorrectCompanyName).exists()).toBe(true)
  })

  it('verifies the text field populated from store', async () => {
    const wrapper = wrapperFactory()
    const companyNameInput = wrapper.find('#company-name-input')

    await Vue.nextTick()

    // Verify data from Store
    expect(companyNameInput.element.value).toBe('Bobs Plumbing')
    expect(getLastEvent(wrapper, 'isValid')).toBe(true)
  })

  it('verifies it is invalid with no Company Name', async () => {
    const wrapper = wrapperFactory()
    const companyNameInput = wrapper.find('#company-name-input')
    wrapper.vm.companyName = null

    await Vue.nextTick()

    // Verify data from Store
    expect(companyNameInput.element.value).toBe('')
    expect(getLastEvent(wrapper, 'isValid')).toBe(false)
  })

  it('verifies the done emission when the change is complete', async () => {
    const wrapper = wrapperFactory()
    const companyNameInput = wrapper.find('#company-name-input')
    wrapper.vm.companyName = 'Bob\'s Plumbing Ltd.'

    await Vue.nextTick()

    // Verify data from Store
    expect(companyNameInput.element.value).toBe('Bob\'s Plumbing Ltd.')
    expect(getLastEvent(wrapper, 'isValid')).toBe(true)

    // Submit Change
    await wrapper.setProps({ formType: 'correct-name' })
    await flushPromises()

    expect(getLastEvent(wrapper, 'done')).toBe(true)

    // Verify Data change in store
    expect(store.state.stateModel.nameRequest.legalName).toBe('Bob\'s Plumbing Ltd.')
  })
})
