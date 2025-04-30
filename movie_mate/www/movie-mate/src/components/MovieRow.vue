<template>
  <div class="flex gap-4 border-b pb-4">
    <img :src="doc.poster_image" alt="" class="w-24 h-auto rounded" />
    <div>
      <router-link :to="`/movie/${doc.name}`" class="text-lg font-bold text-blue-700 hover:underline">
        {{ doc.title }}
      </router-link>
      <p>Genre: {{ doc.genre }}</p>
      <p>Year: {{ doc.release_year }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['doc'])
</script>
