<script setup lang="ts">
import type { WeatherResult } from '@/entities/weather/model/types.ts';
import { AppIcon } from '@/shared/ui/AppIcon';

defineProps<{
  data: WeatherResult;
}>();
</script>

<template>
  <div class="weather-card flex flex-col justify-center items-center h-full p-4 md:p-6 rounded-md border-2 border-white/30 border-solid bg-primary-gradient">
    <div class="text-2xl">
      {{ data.cityName }}
    </div>
    <div class="mt-2 text-lg">
      {{ data.description }}
    </div>
    <div class="mt-2 md:mt-4">
      <AppIcon :name="data.icon" />
    </div>
    <div class="mt-2 md:mt-4 text-5xl font-semibold">
      {{ data.currentTemp }}
    </div>
    <div class="mt-2 md:mt-4 text-lg">
      Влажность: {{ data.humidity }}
    </div>
  </div>
</template>
