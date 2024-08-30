import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import PetCardComponent from '@/components/PetCard.vue'
import pets from '@/config/petsConfig'
import { createPinia, setActivePinia } from 'pinia'

describe('HomeView.vue', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders the correct heading and description', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()] // Add Pinia to the global plugins
      }
    })

    expect(wrapper.text()).toContain('Mein erstes Haustier')
    expect(wrapper.text()).toContain('Bereit, in die Welt der Haustiere einzutauchen?')
  })

  it('renders a PetCardComponent for each pet', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    const petCardComponents = wrapper.findAllComponents(PetCardComponent)
    expect(petCardComponents.length).toBe(pets.length)
  })

  it('passes the correct props to each PetCardComponent', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()]
      }
    })

    const petCardComponents = wrapper.findAllComponents(PetCardComponent)

    petCardComponents.forEach((petCard, index) => {
      expect(petCard.props().pet).toEqual(pets[index])
      expect(petCard.props().isLocked).toBe(!pets[index].isImplemented)
    })
  })
})
