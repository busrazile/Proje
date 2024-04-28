<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          v-model="selectedGenre"
          :items="movieGenres"
          item-title="name"
          item-value="id"
          label="Film Türünü Seçin"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col v-for="(film, index) in filteredMovies" :key="index" cols="12" sm="6" md="4" lg="3">
        <film-card :film="film"></film-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import tmdbService from '@/services/tmdbService';
import FilmCard from '@/components//home/FilmCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    FilmCard
  },
    
  async setup() {
    const popularMovies = ref([])
    const movieGenres = ref([])
    const selectedGenre = ref(null)

    try {
      const response = await tmdbService.get('/movie/popular?language=tr-TR&page=1');
      popularMovies.value = response.data.results;
    } catch (error) {
      console.error('Fetch popular movies error:', error);
    }

    const fetchGenres = () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjRlMjYxZGMyOTg5MDJjYTViYzI3YTUxZDI4NTZhNCIsInN1YiI6IjY2MmExZDQzZDE4YjI0MDA5Y2RlMGNiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mwhMqb3ovI3I9ELTdjfWqw7VHgtK3jE5dc4uHkbmHwk'
        }
      }

      fetch('https://api.themoviedb.org/3/genre/movie/list?language=tr', options)
        .then(response => response.json())
        .then((response) => {
          console.log(response.genres)
          movieGenres.value = response.genres
          console.log(movieGenres.value)
        })
        .catch(err => console.error(err))
    }

    fetchGenres()

    const filteredMovies = computed(() => {
      if (!selectedGenre.value) {
        return popularMovies.value
      }

      return popularMovies.value.filter((film) =>
        film.genre_ids.includes(selectedGenre.value)
      )
    })

    return {
      selectedGenre,
      popularMovies,
      movieGenres,
      filteredMovies,
    };
  },
});
</script>
