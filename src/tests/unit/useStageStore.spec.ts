import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStageStore } from '@/stores/useStageStore'

describe('useStageStore', () => {
  let store: ReturnType<typeof useStageStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useStageStore()

    // Mock setTimeout to control timing in tests
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Restore the original timers
    vi.useRealTimers()
  })

  it('initializes with isActive set to false', () => {
    expect(store.isActive).toBe(false)
  })

  it('toggles isActive state correctly', () => {
    store.toggleState()
    expect(store.isActive).toBe(true)

    store.toggleState()
    expect(store.isActive).toBe(false)
  })

  it('starts stage transition and calls onHalftime after 2000ms', () => {
    const onHalftime = vi.fn()

    store.startStageTransition(onHalftime)
    expect(store.isActive).toBe(true)

    // Fast-forward time by 2000ms
    vi.advanceTimersByTime(2000)

    expect(onHalftime).toHaveBeenCalled()
    expect(store.isActive).toBe(false)
  })

  it('does not call onHalftime before 2000ms', () => {
    const onHalftime = vi.fn()

    store.startStageTransition(onHalftime)
    expect(store.isActive).toBe(true)

    // Fast-forward time by 1000ms (before halftime)
    vi.advanceTimersByTime(1000)

    expect(onHalftime).not.toHaveBeenCalled()
    expect(store.isActive).toBe(true)
  })
})
