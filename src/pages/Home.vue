<template>
	<div id="page-home">
		<h2 class="search-label">Поиск фильмов</h2>

		<div class="search-container">
			<input v-model="searchQuery" @keydown.enter="searchMovies">
			<button @click="searchMovies">Поиск</button>
		</div>

		<div ref="movies" class="movies-list">
			<MovieCard
				v-for="movie in movies"
				:key="movie.id"
				:movie="movie"
			/>
		</div>

		<div v-loading="loading" class="movies-loading">
			<template v-if="error">
				<span class="error-description">Не удалось загрузить фильмы</span>
				<button class="button-link" @click="setMovies()">Повторить</button>
			</template>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import { mutationTypes } from 'Plugins/store/modules/movies'
import { api, errors } from 'Plugins/http'
import MovieCard from 'Components/MovieCard'
import throttle from 'lodash/throttle'

export default {
	name: 'Home',
	components: {
		MovieCard,
	},
	data() {
		return {
			searchQuery: '',
			loading: false,
			error: false,
		}
	},
	computed: {
		...mapState('movies', [
			'movies',
			'search',
		]),
		...mapGetters('movies', [
			'page',
			'isLastPage',
		]),
	},
	watch: {
		search: {
			immediate: true,
			handler(search) {
				this.searchQuery = search
			},
		},
	},
	async created() {
		this.setMovies()
	},
	mounted() {
		window.addEventListener('scroll', this.onScroll)
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll)
	},
	methods: {
		...mapMutations('movies', [
			mutationTypes.SET_MOVIES,
			mutationTypes.ADD_MOVIES,
			mutationTypes.SET_SEARCH,
			mutationTypes.SET_PAGINATION,
			mutationTypes.SET_PAGE,
		]),
		async getMovies(page) {
			this.error = false

			const data = await api.getMovies(this.searchQuery, page || this.page)

			if (data.error) {
				if (data.error === errors.network || data.error === errors.unknown) this.error = true
				return null
			}

			return data
		},
		async setMovies(page) {
			this.loading = true

			const data = await this.getMovies(page)

			if (data) {
				if (data.pagination.page > 1) this[mutationTypes.ADD_MOVIES](data.results)
				else this[mutationTypes.SET_MOVIES](data.results)

				this[mutationTypes.SET_SEARCH](this.searchQuery)
				this[mutationTypes.SET_PAGINATION](data.pagination)
			}

			this.loading = false
		},
		onScroll: throttle(async function () {
			if (this.loading || this.error || this.isLastPage) return
			if (this.$refs.movies.clientHeight > (window.scrollY + window.outerHeight + 800)) return

			await this.setMovies(this.page + 1)
		}, 200),
		async searchMovies() {
			if (this.searchQuery === this.search) return

			this.setMovies(1)
		},
	},
}
</script>

<style lang="scss">
#page-home {
	.movies {
		&-list {
			padding: 0 8px;

			.movie-card {
				max-width: 900px;
				margin-left: auto;
				margin-right: auto;
			}
		}

		&-loading {
			display: flex;
			justify-content: center;
			width: 100%;
			padding: 40px 8px;

			@media screen and (max-width: 419px) {
				flex-wrap: wrap;
			}

			.error-description {
				margin-right: 12px;
			}
		}
	}

	.search {
		&-label {
			text-align: center;
		}

		&-container {
			display: flex;
			justify-content: center;

			input, button {
				padding: 8px 12px;
				border: 1px solid;
			}

			input {
				border-radius: 8px 0 0 8px;
				width: 100%;
				max-width: 200px;
			}

			button {
				border-radius: 0 8px 8px 0;
				background: none;
				margin-left: -1px;
			}
		}
	}
}
</style>