<template>
  <v-container fluid class="d-flex pa-0">
    <home-page />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomePage from '../components/home/HomePage.vue'

export default defineComponent({
  name: 'HomeBase',
  components: {
    HomePage,
  },
  setup () {

    return { }
  }
})
</script>