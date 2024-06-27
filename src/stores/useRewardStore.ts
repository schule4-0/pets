import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useRewardStore = defineStore('rewardStore', () => {
  const router = useRouter();
  const solutionImages = ref<string[]>([]);

  const show = (images: string[], stage: string) => {
    solutionImages.value = images;
    router.push({
      name: 'reward-card',
      params: { stage }
    });
  };

  return {
    solutionImages,
    show
  };
});
