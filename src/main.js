import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {useWebSocket} from "@/services/websocketService.js";

const app = createApp(App);
app.use(router).mount('#app')
