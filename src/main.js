import Vue from 'vue'
import App from './app.vue'

Vue.config.productionTip = false

App.myType = 'app'

const app = new Vue(App)

app.$mount()
