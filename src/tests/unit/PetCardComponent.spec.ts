import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PetCardComponent from '@/components/PetCard.vue'
import { createPinia, setActivePinia } from 'pinia'

// Mock the router and audio manager
const mockPush = vi.fn()
const mockPlaySound = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush
  }))
}))

vi.mock('@/stores/useAudioManager', () => ({
  useAudioManager: vi.fn(() => ({
    playSound: mockPlaySound
  }))
}))

describe('PetCardComponent.vue', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    mockPush.mockClear() // Clear mocks before each test
    mockPlaySound.mockClear()
  })

  const pet = {
    name: 'Dog',
    englishName: 'dog',
    image: 'dog.jpg',
    isImplemented: true
  }

  it('plays a sound and navigates to the correct route when clicked', async () => {
    const wrapper = mount(PetCardComponent, {
      props: {
        pet,
        isLocked: false
      },
      global: {
        plugins: [createPinia()]
      }
    })

    // Simulate clicking the card
    await wrapper.trigger('click')
    expect(mockPlaySound).toHaveBeenCalledWith('CLICK')
    expect(mockPush).toHaveBeenCalledWith(`/pets/${pet.englishName}/stages/0`)
  })

  it('does not play a sound or navigate when the card is locked', async () => {
    const wrapper = mount(PetCardComponent, {
      props: {
        pet,
        isLocked: true
      },
      global: {
        plugins: [createPinia()]
      }
    })

    // Simulate clicking the card
    await wrapper.trigger('click')
    expect(mockPlaySound).not.toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()
  })
})
