<template>
  <v-app-bar color="blue">
    <v-btn
      density="default"
      @click="home"
    >
      Ana sayfa
    </v-btn>
		<v-spacer></v-spacer>
    
    <SearchButton :onSearch="handleSearch" />  <!-- `handleSearch` yönlendirmesi -->

    
    <v-btn
      density="default"
      color="red"
      variant="flat"
      @click="logout"
    >
      Çıkış
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SearchButton from '../navBar/Search.vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    SearchButton,
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

		const home = () => {
      authStore.logout()
      router.push('')
    }

    const handleSearch = (query: string) => {
			console.log(query)
      router.push(`/search?query=${query}`)
    };

    return {
      handleSearch,
      logout,
			home
    }
  },
})
</script>
