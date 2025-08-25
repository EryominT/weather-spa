<script setup lang="ts">
import { AppHeader } from '@/widgets/AppHeader';
</script>

<template>
  <div class="main flex flex-grow flex-col p-3 md:p-10">
    <div>
      <AppHeader />
    </div>
    <main class="flex flex-col flex-grow mt-8 md:mt-14">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main {
  background: linear-gradient(135deg, #052652, #2d9cdb);
}
</style>
