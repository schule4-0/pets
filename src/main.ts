import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { exitFullscreen, requestFullscreen } from './utils/fullscreenUtils'

const app = createApp(App)

// FullScreen
app.config.globalProperties.requestFullscreen = requestFullscreen
app.config.globalProperties.exitFullscreen = exitFullscreen
router.afterEach((to) => {
  if (to.name === 'dog-onboarding') {
    app.config.globalProperties.requestFullscreen()
  } else if (to.name === 'home') {
    app.config.globalProperties.exitFullscreen()
  }
})

app.use(createPinia())
app.use(router)

app.mount('#app')
