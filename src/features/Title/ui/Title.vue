<script lang="ts" setup>
import Skeleton from 'primevue/skeleton';

withDefaults(
  defineProps<{
    title?: string;
    subTitle?: string;
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);
</script>

<template>
  <div>
    <h1 v-if="title && !loading" class="text-xl md:text-4xl">
      {{ title }}
    </h1>
    <Skeleton v-else-if="loading" height="2rem" />

    <h2 v-if="subTitle && !loading" class="mt-1 md:mt-3 text-lg md:text-3xl text-primary-900">
      {{ subTitle }}
    </h2>
    <Skeleton v-else-if="loading" height="1rem" class="mt-1 md:mt-3" />
  </div>
</template>
