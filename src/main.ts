import './assets/main.sass'
import '/src/logic/utils/elementRect.ts'
import "/src/logic/utils/ArrayExtension.ts";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
