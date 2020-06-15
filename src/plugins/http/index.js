import axios from 'axios'

export const errors = {
	network: 1,
	missedParam: 2,
	unknown: 3,
	invalidKey: 4,
	notFound: 5,
}

export const http = axios.create({
	baseURL: process.env.VUE_APP_URL_API,
	params: {
		api_key: process.env.VUE_APP_API_KEY,
		language: 'ru-RU',
	},
})

function getError(error) {
	if (error.response) {
		if (error.response.status === 401) return { error: errors.invalidKey }
		if (error.response.status === 404) return { error: errors.notFound, message: error.response.status_message }
	}

	return { error: errors.network }
}

export const api = {
	async getMovies(search, page = 1) {
		if (!search) return { error: errors.missedParam, param: 'search' }

		try {
			const { data } = await http.get('/search/movie', { params: { query: search, page } })

			return {
				results: data.results,
				pagination: {
					page: data.page,
					pages: data.total_pages,
					results: data.total_results,
				},
			}
		} catch (error) {
			return getError(error)
		}
	},
	async getGenres() {
		try {
			const { data } = await http.get('/genre/movie/list')

			return { results: data.genres }
		} catch (error) {
			return getError(error)
		}
	},
	async getConfiguration() {
		try {
			const { data } = await http.get('/configuration')

			return data
		} catch {
			return { error: errors.network }
		}
	},
	async getMovieById(id) {
		try {
			const { data } = await http.get(`/movie/${id}`)

			return data
		} catch (error) {
			return getError(error)
		}
	},
}

// export as vue plugin
export default {
	install(Vue) {
		Vue.prototype.$http = http
	},
}