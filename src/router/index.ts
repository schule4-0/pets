import type { defineComponent } from 'vue'
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainGameView from '@/views/MainGameView.vue'
import MinigameEquipment from '@/views/dog/MinigameEquipment.vue'
import MinigameTwo from '@/views/dog/MinigameTwo.vue'
import RecapQuiz from '@/views/dog/RecapQuiz.vue'
import MinigameJumpNRun from '@/views/dog/MinigameJumpNRun.vue'
import MinigameCareTime from '@/views/dog/MinigameCareTime.vue'

type PetStage = {
  path: string
  component: ReturnType<typeof defineComponent>
  name: string
}

type PetStages = {
  [key: string]: PetStage[]
}

// Define the stages for each pet
const petStages: PetStages = {
  dog: [
    { path: 'stages/1', component: MinigameEquipment, name: 'dog-equipment' },
    { path: 'stages/2', component: MinigameTwo, name: 'dog-stage-two' },
    { path: 'stages/3', component: MinigameJumpNRun, name: 'dog-jump-n-run' },
    { path: 'stages/4', component: MinigameCareTime, name: 'dog-caretime' },
    { path: 'stages/quiz', component: RecapQuiz, name: 'dog-recap-quiz' }
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
  children: petStages[pet]
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

export default router
