<script setup lang="ts">
import type { IconName } from '@/shared/ui/AppIcon/model/types.ts';
import Skeleton from 'primevue/skeleton';
import { iconComponent } from '../model/iconComponent';

withDefaults(
  defineProps<{
    name: IconName;
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);
</script>

<template>
  <component :is="iconComponent[name]" v-if="!loading" class="flex-shrink-0" :class="$attrs?.class" :data-cy="`app-icon-${name}`" />
  <Skeleton v-else shape="circle" size="5rem" />
</template>
