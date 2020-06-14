<template>
	<router-link :to="{ name: 'Movie', params: { id: movie.id } }" class="movie-card">
		<div class="movie-card__poster">
			<img v-if="movie.poster_path" :src="posterLink">
		</div>
		<div class="movie-card__details">
			<h3 class="movie-card__title">{{ movie.title }}</h3>

			<span class="movie-card__genres">{{ movieGenres }}</span>

			<p class="movie-card__description">{{ description }}</p>
		</div>
	</router-link>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
	name: 'MovieCard',
	props: {
		movie: {
			type: Object,
			required: true,
		},
	},
	computed: {
		...mapState('meta', [
			'genres',
		]),
		...mapGetters('meta', [
			'imageUrl',
		]),
		posterLink() {
			return `${this.imageUrl}/w500/${this.movie.poster_path}`
		},
		description() {
			if (!this.movie.overview) return 'Нет описания'

			return this.movie.overview.length > 515 ? `${this.movie.overview.substr(0, 516)}...` : this.movie.overview
		},
		movieGenres() {
			if (!this.movie.genre_ids || this.movie.genre_ids.length === 0) return ''

			return this.movie.genre_ids.map(genre => this.genres[genre]).join(', ')
		},
	},
}
</script>

<style lang="scss">
.movie-card {
	display: flex;
	cursor: pointer;
	border-radius: 8px;
	overflow: hidden;
	text-decoration: none;
	color: #212121;
	margin: 16px 8px;
	box-shadow: 0 0 5px #9e9e9e;
	transition: all 0.3s ease;

	&:hover {
		box-shadow: 0 0 10px #9e9e9e;
	}

	@media screen and (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}

	&__poster {
		width: 220px;
		flex-shrink: 0;
		line-height: 0;

		@media screen and (max-width: 768px) {
			width: 140px;
		}
	}

	&__details {
		padding: 16px;
		width: 100%;

		@media screen and (max-width: 768px) {
			text-align: center;
		}
	}

	&__title {
		margin-top: 0;
	}

	&__description {
		@media screen and (max-width: 768px) {
			text-align: justify;
		}
	}

	&__genres {
		color: #424242;
		font-size: 14px;
	}
}
</style>