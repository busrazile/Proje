<template>
  <v-container>
    <h2>Oturum Açma</h2>
    <v-btn @click="authorize">TMDB ile Oturum Aç</v-btn>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const requestToken = ref(null)

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/authentication/token/new',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjRlMjYxZGMyOTg5MDJjYTViYzI3YTUxZDI4NTZhNCIsInN1YiI6IjY2MmExZDQzZDE4YjI0MDA5Y2RlMGNiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mwhMqb3ovI3I9ELTdjfWqw7VHgtK3jE5dc4uHkbmHwk'
  }
};

axios
  .request(options)
  .then(function (response) {
    requestToken.value = response.data.request_token;
    console.log(response.data)
  })
  .catch(function (error) {
    console.error(error)
  })

const authorize = async () => {
  if (!requestToken.value) {
    await getRequestToken()
  }
  
  const redirectUrl = encodeURIComponent(window.location.origin + '/login-callback')
  const authUrl = `https://www.themoviedb.org/authenticate/${requestToken.value}?redirect_to=${redirectUrl}`
  window.location.href = authUrl
};
</script>
  