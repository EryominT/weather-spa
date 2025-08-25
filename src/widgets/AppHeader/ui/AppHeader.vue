<script lang="ts" setup>
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CitySelect } from '@/features/CitySelect';

const router = useRouter();
const route = useRoute();

const currentPath = computed(() => route.path);
</script>

<template>
  <header class="flex justify-between space-y-4 sm:space-y-0 sm:space-x-5 flex-col sm:flex-row">
    <nav class="nav">
      <ButtonGroup class="text-sm md:text-xl">
        <Button label="Главная" class="nav__item" :class="{ active: currentPath === '/' }" @click="router.push({ path: '/' })" />
        <Button label="Погода за неделю" class="nav__item" :class="{ active: currentPath === '/weather-for-week' }" @click="router.push({ path: '/weather-for-week' })" />
      </ButtonGroup>
    </nav>

    <CitySelect />
  </header>
</template>

<style scoped>
:deep(.p-button) {
  font-size: inherit;
}

.nav__item {
  @apply text-primary-700;
}

.nav__item.active {
  color: #ffffff;
}
</style>
