<template>
	<div id="page-movie" v-loading="loading">
		<template v-if="movie">
			<h1 class="movie-title">{{ movie.title }}</h1>
			<router-link :to="{ name: 'Home' }">
				<button class="button-link"><h3>К списку фильмов</h3></button>
			</router-link>

			<div class="movie-page">
				<div class="movie-page__poster">
					<img :src="posterLink">
				</div>

				<div class="movie-page__details">
					<MovieDetail label="Оригинальное название" :description="movie.original_title"/>
					<MovieDetail label="Жанр" :description="movieGenres"/>
					<MovieDetail label="Описание" :description="movie.overview"/>
					<MovieDetail label="IMDB">
						<template #description>
							<a :href="imdbLink">{{ movie.imdb_id }}</a>
						</template>
					</MovieDetail>

					<MovieDetail label="Рейтинг" :description="`${movie.vote_average} (${movie.vote_count})`"/>
					<MovieDetail label="Дата выхода" :description="releaseDate"/>
					<MovieDetail label="Продолжительность" :description="runtime"/>
				</div>
			</div>
		</template>

		<div v-else-if="error">
			<span class="error-description">{{ error.message }}</span>
			<button
				v-if="error.action"
				class="button-link"
				@click="error.action"
			>Повторить</button>
		</div>

		<div class="movie-cover" :style="`background-image: url(${backdropLink})`"/>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { api, errors } from 'Plugins/http'
import MovieDetail from 'Components/MovieDetail'

export default {
	name: 'MoviePage',
	components: {
		MovieDetail,
	},
	props: {
		id: {
			type: [Number, String],
			required: true,
		},
	},
	data() {
		return {
			loading: true,
			error: null,
			movieFull: null,
		}
	},
	computed: {
		...mapState('meta', ['genres']),
		...mapState('movies', ['movies']),
		...mapGetters('meta', ['imageUrl']),
		movieFromStore() {
			return this.movies.find(movie => movie.id === +this.id)
		},
		movie() {
			return this.movieFull || this.movieFromStore || {}
		},
		posterLink() {
			return `${this.imageUrl}/w500/${this.movie.poster_path}`
		},
		backdropLink() {
			return `${this.imageUrl}/original/${this.movie.backdrop_path}`
		},
		movieGenres() {
			if (this.movie.genres) return this.movie.genres.map(genre => genre.name).join(', ')
			if (!this.movie.genre_ids || this.movie.genre_ids.length === 0) return ''

			return this.movie.genre_ids.map(genre => this.genres[genre]).join(', ')
		},
		imdbLink() {
			return `https://www.imdb.com/title/${this.movie.imdb_id}`
		},
		releaseDate() {
			if (!this.movie.release_date) return '-'

			return new Date(this.movie.release_date).toLocaleDateString()
		},
		runtime() {
			const { runtime } = this.movie
			if (runtime < 60) return `${runtime}мин`
			return `${Math.floor(runtime / 60)}ч ${runtime % 60}мин`
		},
	},
	created() {
		this.setMovie()
	},
	methods: {
		async setMovie() {
			this.loading = true
			this.error = null

			const data = await api.getMovieById(this.id)

			if (data.error) {
				if (data.error === errors.notFound) this.error = { message: 'Фильм не найден' }
				this.error = { message: 'Не удалось загрузить информацию о фильме', action: this.setMovie }
			} else {
				this.movieFull = data
			}

			this.loading = false
		},
	},
}
</script>

<style lang="scss">
#page-movie {
	padding: 12px 0;
	height: 100%;

	.movie {
		&-title {
			text-align: center;
		}

		&-cover {
			width: 100%;
			height: 100%;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			background-attachment: fixed;
			z-index: -1;
			opacity: 0.2;
			position: fixed;
			top: 0;
			left: 0;
		}

		&-page {
			display: flex;
			flex-wrap: wrap;
			max-width: 900px;
			margin-left: auto;
			margin-right: auto;

			&__poster {
				width: 240px;
				flex-shrink: 0;
			}

			&__details {
				padding: 16px;
			}
		}
	}
}
</style>