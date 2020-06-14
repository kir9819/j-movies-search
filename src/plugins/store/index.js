import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const isDevelopment = process.env.VUE_APP_MODE === 'development'

const store = new Vuex.Store({
	strict: isDevelopment,
	modules: {},
})

export default store