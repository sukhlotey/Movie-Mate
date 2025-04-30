<template>
  <div class="p-8 space-y-4">
    <h1 class="text-2xl font-bold">Movie List</h1>
    <div v-if="loading"><Spinner /></div>
    <MovieRow v-for="movie in movies" :key="movie.name" :doc="movie" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { call } from 'frappe-ui'
import MovieRow from './MovieRow.vue'

const movies = ref([])
const loading = ref(true)

onMounted(async () => {
  const res = await call('frappe.client.get_list', {
    doctype: 'Movie',
    fields: ['name', 'title', 'poster_image', 'genre', 'release_year', 'route']
  })
  movies.value = res.message
  loading.value = false
})
</script>
	
