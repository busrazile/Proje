<template>
  <v-row>
    <v-col cols="11">
      <v-text-field
        v-model="searchQuery"
        label="Ara"
        dense
        hide-details
        @keydown.enter="triggerSearch"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SearchButton',
  props: {
    onSearch: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const searchQuery = ref('')

    const triggerSearch = () => {
      props.onSearch(searchQuery.value)
    };

    return {
      searchQuery,
      triggerSearch,
    };
  },
})
</script>
