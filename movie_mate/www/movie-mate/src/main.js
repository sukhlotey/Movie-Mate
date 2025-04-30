import './assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import {
  Button,
  Badge,
  Rating,
  Spinner
} from 'frappe-ui'

const app = createApp(App)

app.component('Button', Button)
app.component('Badge', Badge)
app.component('Rating', Rating)
app.component('Spinner', Spinner)

app.use(router)
app.mount('#app')
