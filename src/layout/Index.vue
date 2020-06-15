<template>
	<div class="app-container">
		<div
			v-for="(error, name) in currentErrors"
			:key="name"
			v-loading="error.loading"
		>
			<span>{{ error.message }}</span>
			<button
				v-if="error.action"
				:disabled="error.loading"
				@click="error.action"
			>Попробовать ещё раз</button>
		</div>

		<router-view/>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mutationTypes } from 'Plugins/store/modules/meta'
import { api } from 'Plugins/http'

export default {
	name: 'Layout',
	data() {
		return {
			errors: {
				genres: null,
				configuration: null,
			},
		}
	},
	computed: {
		title() {
			return this.$route.meta.title
		},
		currentErrors() {
			return Object.fromEntries(Object.entries(this.errors).filter(error => !!error[1]))
		},
	},
	watch: {
		title: 'setMetaTitle',
	},
	created() {
		this.setGenres()
		this.setConfiguration()
	},
	methods: {
		...mapMutations('meta', [
			mutationTypes.SET_GENRES,
			mutationTypes.SET_CONFIGURATION,
		]),
		setMetaTitle() {
			document.title = this.title
		},
		async setGenres() {
			if (this.errors.genres) this.errors.genres.loading = true

			const data = await api.getGenres(this.errors.genres ? null : 1)

			if (data.error) {
				this.errors.genres = {
					message: 'Не удалось загрузить жанры фильмов',
					action: this.setGenres,
					loading: false,
				}

				return
			}

			this.errors.genres = null

			this[mutationTypes.SET_GENRES](data.results)
		},
		async setConfiguration() {
			if (this.errors.configuration) this.errors.configuration.loading = true

			const data = await api.getConfiguration(this.errors.configuration ? null : 1)

			if (data.error) {
				this.errors.configuration = {
					message: 'Не удалось загрузить информацию о конфигурации системы',
					action: this.setConfiguration,
					loading: false,
				}

				return
			}

			this.errors.configuration = null

			this[mutationTypes.SET_CONFIGURATION](data)
		},
	},
}
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}

body {
	min-height: 100vh;
	min-width: 320px;
	margin: 0;
	padding: 8px;
	position: relative;
}

.app-container {
	height: 100%;
}

@keyframes loader-rotate {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}

.loading {
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	&-item {
		width: 24px;
		height: 24px;
		border: 4px solid rgba(#0052ec, 0.25);
		border-top-color: #0052ec;
		border-radius: 50%;
		animation: loader-rotate 1s linear infinite;
		margin: auto;
	}

	&-container {
		position: relative;
		overflow: hidden;
	}
}

img {
	max-width: 100%;
	max-height: 100%;
}

.error-description {
	color: #b71c1c;
}

button {
	cursor: pointer;

	&.button-link {
		border: none;
		background: none;
	}
}
</style>