<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-img
          :src="'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path"
          aspect-ratio="0.7"
          alt="Film Poster"
          cover
        ></v-img>
      </v-col>

      <v-col cols="12" md="8">
        <v-card-title>{{ movieDetails.title }}</v-card-title>
        <v-card-subtitle>{{ movieDetails.tagline }}</v-card-subtitle>

        <v-divider class="my-2"></v-divider>

        <v-card-text>
          <strong>Genel Bakış:</strong>
          <p>{{ movieDetails.overview }}</p>

          <strong>Türler:</strong>
          <ul>
            <li v-for="genre in movieDetails.genres" :key="genre.id">
              {{ genre.name }}
            </li>
          </ul>

          <strong>Bütçe:</strong> {{ movieDetails.budget.toLocaleString() }} USD
          <br>
          <strong>Hasılat:</strong> {{ movieDetails.revenue.toLocaleString() }} USD
          <br>
          <strong>Çıkış Tarihi:</strong> {{ new Date(movieDetails.release_date).toLocaleDateString() }}
          <br>
          <strong>Süre:</strong> {{ movieDetails.runtime }} minutes
        </v-card-text>

        <v-divider class="my-2"></v-divider>

        <v-card-actions>
          <v-btn
            icon
            @click="openExternalLink(movieDetails.homepage)"
            color="blue"
          >
            <v-icon>mdi-web</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="openExternalLink('https://www.imdb.com/title/' + movieDetails.imdb_id)"
            color="blue"
          >
            <v-icon>mdi-filmstrip</v-icon>
          </v-btn>
          <v-btn
            density="default"
            color="blue"
            variant="flat"
            @click="rateMovie()"
          >
            Oyla
          </v-btn>
          <v-slider
            v-model="rating"
            min="0"
            max="10"
            step="0.5"
            color="primary"
            hide-details
            thumb-label="always"
          ></v-slider>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import tmdbService from '@/services/tmdbService';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'MovieDetail',
  async setup() {
    const route = useRoute()
    const movieId = route.params.movie_id
    const movieDetails = ref(null)
    const rating = ref(0)

    try {
      const response = await tmdbService.get(`/movie/${movieId}?language=tr-TR&page=1`)
      movieDetails.value = response.data
    } catch (error) {
      console.error('Error fetching movie details:', error)
    }

    const openExternalLink = (url) => {
      window.open(url, '_blank')
    };


  const rateMovie = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjRlMjYxZGMyOTg5MDJjYTViYzI3YTUxZDI4NTZhNCIsInN1YiI6IjY2MmExZDQzZDE4YjI0MDA5Y2RlMGNiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mwhMqb3ovI3I9ELTdjfWqw7VHgtK3jE5dc4uHkbmHwk'
      },
      body: `{"value":${rating.value}}`
    }

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

    return {
      movieDetails,
      rating,
      openExternalLink,
      rateMovie
    };
  },
});
</script>
