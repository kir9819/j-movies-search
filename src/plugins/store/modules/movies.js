export const mutationTypes = {
	SET_MOVIES: 'SET_MOVIES',
	ADD_MOVIES: 'ADD_MOVIES',
	SET_SEARCH: 'SET_SEARCH',
	SET_PAGINATION: 'SET_PAGINATION',
	SET_PAGE: 'SET_PAGE',
}

export default {
	namespaced: true,
	state: () => ({
		movies: [],
		search: 'Friends',
		pagination: {
			page: 1,
			pages: 1,
			results: 1,
		},
	}),
	getters: {
		isLastPage: state => (state.pagination.page * 20) >= state.pagination.results,
		page: state => state.pagination.page,
	},
	mutations: {
		[mutationTypes.SET_MOVIES](state, movies) {
			state.movies = movies
		},
		[mutationTypes.ADD_MOVIES](state, movies) {
			state.movies.push(...movies)
		},
		[mutationTypes.SET_PAGINATION](state, { page, pages, results }) {
			state.pagination.page = page
			state.pagination.pages = pages
			state.pagination.results = results
		},
		[mutationTypes.SET_SEARCH](state, search) {
			state.search = search
		},
		[mutationTypes.SET_PAGE](state, page) {
			state.pagination.page = page
		},
	},
}