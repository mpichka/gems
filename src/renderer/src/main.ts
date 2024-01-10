import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'

const Pinia = createPinia()

createApp(App).use(Pinia).use(Router).mount('#app')
