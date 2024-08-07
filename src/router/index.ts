import type { defineComponent } from 'vue'
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainGameView from '@/views/MainGameView.vue'
import MinigameEquipment from '@/views/dog/MinigameEquipment.vue'
import RecapQuiz from '@/views/dog/RecapQuiz.vue'
import MinigameWalk from '@/views/dog/MinigameWalk.vue'
import MinigameCareTime from '@/views/dog/MinigameCareTime.vue'
import MinigameFood from '@/views/dog/MinigameFood.vue'
import DogOnboarding from '@/views/dog/DogOnboarding.vue'
import DogOffboarding from '@/views/dog/DogOffboarding.vue'
import RewardView from '@/views/dog/RewardView.vue'
import { useAudioManager } from '@/stores/useAudioManager'
import { useMascotStore } from '@/stores/useMascotStore'

type PetStage = {
  path: string
  component: ReturnType<typeof defineComponent>
  name: string
  children?: RouteRecordRaw[]
}

type PetStages = {
  [key: string]: PetStage[]
}

// Define the stages for each pet
const petStages: PetStages = {
  dog: [
    { path: 'stages/0', component: DogOnboarding, name: 'dog-onboarding' },
    { path: 'stages/1', component: MinigameEquipment, name: 'dog-equipment' },
    { path: 'stages/2', component: MinigameFood, name: 'dog-nutrition' },
    { path: 'stages/3', component: MinigameWalk, name: 'dog-walk' },
    { path: 'stages/4', component: MinigameCareTime, name: 'dog-caretime' },
    { path: 'stages/5', component: RecapQuiz, name: 'dog-recap-quiz' },
    { path: 'stages/6', component: DogOffboarding, name: 'dog-offboarding' },
    { path: 'stages/:stageId/reward', component: RewardView, name: 'dog-reward' }
  ]
  //cat: [
  //  { path: 'stages/1', component: MinigameEquipment, name: 'cat-one' },
  //  { path: 'stages/2', component: MinigameTwo, name: 'cat-stage-two' }
  //]
}

// Create dynamic routes based on pets
const petRoutes: RouteRecordRaw[] = Object.keys(petStages).map((pet) => ({
  path: `/pets/${pet}`,
  component: MainGameView,
  children: petStages[pet] as RouteRecordRaw[]
}))

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  ...petRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const audioManager = useAudioManager()
  const mascot = useMascotStore()
  audioManager.stopAllSounds()
  mascot.cancelMessage()
  next()
})

export default router
