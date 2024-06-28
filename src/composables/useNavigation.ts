import { useRouter, useRoute } from 'vue-router'

export function useStageNavigator() {
  const router = useRouter()
  const route = useRoute()

  function getCurrentStageNumber() {
    // URL is like `/pets/{pet}/stages/{stageNumber}`
    // Extract the current pet type from the URL
    const pathSegments = route.path.split('/')
    return parseInt(pathSegments[4])
  }

  function goToStage(direction: 'previous' | 'next') {
    // URL is like `/pets/{pet}/stages/{stageNumber}`
    // Extract the current pet type from the URL
    const pathSegments = route.path.split('/')
    const pet = pathSegments[2]
    const currentStageNumber = getCurrentStageNumber()

    // Find the parent route for the pet
    const parentRoute = router.getRoutes().find((r) => r.path === `/pets/${pet}`)

    if (!parentRoute || !parentRoute.children) {
      console.error('Parent route or stages not configured correctly')
      return
    }

    // Find current stage and calculate the new stage index
    const currentStageIndex = parentRoute.children.findIndex(
      (stage) => stage.path === `stages/${currentStageNumber}`
    )
    const newStageIndex = direction === 'next' ? currentStageIndex + 1 : currentStageIndex - 1

    // Navigate to the new stage if available
    if (parentRoute.children[newStageIndex]) {
      router.push({ name: parentRoute.children[newStageIndex].name })
    } else {
      if (direction === 'next') {
        console.warn('You have reached the last stage of this pet.')
      } else {
        console.warn('You are at the first stage of this pet.')
      }
    }
  }

  return {
    goToNextStage: () => goToStage('next'),
    goToPreviousStage: () => goToStage('previous'),
    getCurrentStageNumber
  }
}
