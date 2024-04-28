<template>
  <v-app>
    <nav-bar></nav-bar>

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/navBar/NavBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
});
</script>

<style lang="scss">
nav-bar {
  position: sticky;
  top: 0;
  z-index: 1000;
}
v-main {
  margin-top: 56px;  
}
</style>
