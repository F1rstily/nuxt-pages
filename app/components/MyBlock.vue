<template>
  <UCard class="p-6 my-4 bg-white dark:bg-slate-800">
    <h2 class="text-2xl font-bold mb-2">{{ title }}</h2>
    <p class="mb-4">{{ text }}</p>
    <UButton color="primary" @click="onClick">Подробнее</UButton>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  text: string
}>()

const onClick = () => {
  alert('Сиськи!')
}
</script>

<style scoped>
/* Можно добавить свои стили */
</style>