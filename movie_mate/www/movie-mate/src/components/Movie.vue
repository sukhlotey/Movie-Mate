<template>
  <div class="p-8 space-y-4" v-if="movie">
    <div class="flex gap-4">
      <img :src="movie.poster_image" class="w-40 h-auto rounded shadow" />
      <div>
        <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
        <p>Genre: {{ movie.genre }}</p>
        <p>Release Year: {{ movie.release_year }}</p>
        <p>Director: {{ movie.director || 'N/A' }}</p>
        <p>Status: {{ movie.status || 'N/A' }}</p>
        <p>Average Rating: {{ movie.average_rating || 'No ratings yet' }}</p>
      </div>
    </div>
    <p class="mt-4">{{ movie.description }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { call } from 'frappe-ui'
import { useRoute } from 'vue-router'

const movie = ref(null)
const route = useRoute()

onMounted(async () => {
  const res = await call('frappe.client.get', {
    doctype: 'Movie',
    name: route.params.name
  })
  movie.value = res.message
})
</script>
