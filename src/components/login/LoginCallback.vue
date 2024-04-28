<template>
  <v-container>
    <h2>Oturum Açılıyor...</h2>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const authStore = useAuthStore()
const router = useRouter()

const createSession = async (requestToken) => {
const options = {
  method: 'POST',
  url: 'https://api.themoviedb.org/3/authentication/session/new',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjRlMjYxZGMyOTg5MDJjYTViYzI3YTUxZDI4NTZhNCIsInN1YiI6IjY2MmExZDQzZDE4YjI0MDA5Y2RlMGNiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mwhMqb3ovI3I9ELTdjfWqw7VHgtK3jE5dc4uHkbmHwk',
  },
  data: {
    request_token: requestToken,
  },
};

try {
  const response = await axios.request(options)
  authStore.login(response.data.session_id)
  router.push('/')
} catch (error) {
  console.error('Oturum oluşturma hatası:', error)
  router.push('/login')
}
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const approved = urlParams.get('approved')
  const requestToken = urlParams.get('request_token')

  if (approved === 'true' && requestToken) {
    createSession(requestToken)
  } else {
    router.push('/login')
  }
});

</script>
