import axios from 'axios'

let httpInstance = {}

if (process.env.VUE_APP_URL_API) {
	httpInstance = axios.create({
		baseURL: process.env.VUE_APP_URL_API,
		params: { apikey: process.env.VUE_APP_API_KEY },
	})
} else {
	httpInstance = axios.create()
}

export const http = httpInstance

// export as vue plugin
export default {
	install(Vue) {
		Vue.prototype.$http = httpInstance
	},
}