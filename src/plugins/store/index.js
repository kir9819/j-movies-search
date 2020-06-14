import Vue from 'vue'
import Vuex from 'vuex'
import movies from './modules/movies'
import meta from './modules/meta'

Vue.use(Vuex)

const isDevelopment = process.env.VUE_APP_MODE === 'development'

const store = new Vuex.Store({
	strict: isDevelopment,
	modules: {
		movies,
		meta,
	},
})

export default store