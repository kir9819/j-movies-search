export const mutationTypes = {
	SET_GENRES: 'SET_GENRES',
	SET_CONFIGURATION: 'SET_CONFIGURATION',
}

export default {
	namespaced: true,
	state: () => ({
		genres: {},
		configuration: {
			images: {},
		},
	}),
	getters: {
		imageUrl: state => state.configuration.images.secure_base_url,
	},
	mutations: {
		[mutationTypes.SET_GENRES](state, genres) {
			state.genres = genres.reduce((result, genre) => {
				result[genre.id] = genre.name

				return result
			}, {})
		},
		[mutationTypes.SET_CONFIGURATION](state, configuration) {
			state.configuration.images = configuration.images
		},
	},
}