import Vue from 'vue'
import router from 'Plugins/router'
import store from 'Plugins/store'
import $http from 'Plugins/http'
import App from './layout/Index.vue'

Vue.use($http)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')