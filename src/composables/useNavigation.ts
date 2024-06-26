import { useRouter, useRoute } from 'vue-router'

export function useStageNavigator() {
  const router = useRouter()
  const route = useRoute()

  function goToNextStage() {
    // URL is like `/pets/{pet}/stages/{stageNumber}`
    // Extract the current pet type from the URL
    const pathSegments = route.path.split('/')
    const pet = pathSegments[2]
    const currentStageNumber = parseInt(pathSegments[4])

    // Find the parent route for the pet
    const parentRoute = router.getRoutes().find((r) => r.path === `/pets/${pet}`)

    if (!parentRoute || !parentRoute.children) {
      console.error('Parent route or stages not configured correctly')
      return
    }

    // Find current stage and calculate the next stage index
    const currentStageIndex = parentRoute.children.findIndex(
      (stage) => stage.path === `stages/${currentStageNumber}`
    )
    const nextStageIndex = currentStageIndex + 1

    // Navigate to the next stage if available
    if (parentRoute.children[nextStageIndex]) {
      router.push({ name: parentRoute.children[nextStageIndex].name })
      console.log('nextStageIndex: ', nextStageIndex)
    } else {
      console.warn('You have reached the last stage of this pet.')
    }
  }

  return {
    goToNextStage
  }
}
