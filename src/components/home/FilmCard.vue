<template>
  <v-card
    class="mx-auto my-3 pa-2"
    min-width="250"
    max-width="300"
    outlined
    @click="goToMovieDetail"
  >
    <v-img
      :src="'https://media.themoviedb.org/t/p/w220_and_h330_face/' + film.poster_path"
      aspect-ratio="0.7"
      alt="Film Poster"
      cover
    ></v-img>

    <v-card-title class="text-h6 pa-0">
      {{ film.title }}
    </v-card-title>

    <v-card-subtitle class="pa-0">
      Çıkış tarihi: {{ film.release_date }}
    </v-card-subtitle>

    <v-divider class="my-2"></v-divider>

    <v-row align="center">
      <v-col cols="6" class="d-flex align-items-center">
        <v-icon small class="mr-1">mdi-star-outline</v-icon>
        {{ film.vote_average }}
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-icon small>mdi-information-outline</v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'FilmCard',
  props: ['film'],
  setup(props) {
    const router = useRouter();


    const goToMovieDetail = () => {
      router.push(`/movie/${props.film.id}`)
    }

    return {
      goToMovieDetail
    }
      
  },
})
</script>

<style scoped>
.v-card {
  transition: 0.3s ease-in-out;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style>
