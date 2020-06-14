<template>
	<div>
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'Layout',
	computed: {
		title() {
			return this.$route.meta.title
		},
	},
	watch: {
		title: 'setMetaTitle',
	},
	methods: {
		setMetaTitle() {
			document.title = this.title
		},
	},
}
</script>