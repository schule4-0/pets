import { useStageNavigator } from '@/composables/useNavigation'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useRewardStore = defineStore('rewardStore', () => {
  const router = useRouter()
  const { getCurrentStageNumber } = useStageNavigator()
  const solutionImages = ref<string[]>([])

  const show = (images: string[]) => {
    solutionImages.value = images
    console.log(router.currentRoute.value.params.stageId)
    router.push({
      name: 'dog-reward',
      params: {
        stageId: getCurrentStageNumber()
      }
    })
  }

  return {
    solutionImages,
    show
  }
})
