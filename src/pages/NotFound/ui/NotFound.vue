<script setup lang="ts">
</script>

<template>
  <div class="not-found flex justify-center items-center flex-grow flex-col text-center">
    <h1 class="text-2xl md:text-5xl">
      404 - Страница не найдена
    </h1>
    <p class="md:text-xl mt-2 md:mt-5">
      Извините, запрошенная страница не существует.
    </p>
    <router-link to="/" class="mt-2 underline">
      Вернуться на главную
    </router-link>
  </div>
</template>

<style scoped>
.not-found {
  background: linear-gradient(135deg, #052652, #2d9cdb);
}
</style>
