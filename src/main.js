import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vConsole from 'vconsole'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

if (process.env.NODE_ENV !== 'production') {
    new vConsole()
}
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
