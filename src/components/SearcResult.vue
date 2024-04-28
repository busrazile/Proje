<template>
	<v-container>
		<v-row>
			<v-col
				v-for="(popularMovie, index) in filteredFilms"
				:key="index"
				cols="12"
				sm="6"
				md="4"
				lg="3"
			>
				<film-card :film="popularMovie"></film-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FilmCard from '@/components//home/FilmCard.vue'

export default defineComponent({
  name: 'SearchResult',
	components: {
    FilmCard
  },
  setup() {
    const route = useRoute()
    const query = ref(route.query.query as string)
    const filteredFilms = ref([])

    const searchMovies = () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjRlMjYxZGMyOTg5MDJjYTViYzI3YTUxZDI4NTZhNCIsInN1YiI6IjY2MmExZDQzZDE4YjI0MDA5Y2RlMGNiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mwhMqb3ovI3I9ELTdjfWqw7VHgtK3jE5dc4uHkbmHwk',
        },
      };

      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${route.query.query}&include_adult=false&language=tr-TR&page=1`,
        options
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('HTTP error! Status: ' + response.status)
          }
          return response.json()
        })
        .then((data) => {
          filteredFilms.value = data.results
        })
        .catch((err) => console.error('Hata oluştu:', err))
    };

    watch(() => route.query.query, searchMovies, { immediate: true })

    return {
      query,
      filteredFilms,
    };
  },
})
</script>
