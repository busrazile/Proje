<template>
	<v-container fluid class="d-flex pa-0">
		<detail-movies />
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DetailMovies from '../components/detail/DetailMovies.vue'

export default defineComponent({
	name: 'DetailBase',
	components: {
		DetailMovies,
	},
	setup () {

		return { }
	}
})
</script>