<template functional>
	<div class="movie-detail">
		<b class="movie-detail__label">{{ data.attrs.label }}</b>
		<slot name="description"/>
		<span v-if="data.attrs.description" class="movie-detail__description">{{ data.attrs.description }}</span>
	</div>
</template>

<style lang="scss">
.movie-detail {
	display: flex;
	margin-bottom: 8px;

	@media screen and (max-width: 419px) {
		flex-direction: column;
	}

	&__label {
		width: 160px;
		flex-shrink: 0;
		margin-bottom: 8px;
		margin-right: 12px;

		@media screen and (max-width: 419px) {
			width: 100%;
		}
	}

	&__description {
		margin-bottom: 8px;
		max-width: 300px;
		text-align: justify;

		@media screen and (max-width: 419px) {
			width: 100%;
			max-width: 100%;
		}
	}
}
</style>