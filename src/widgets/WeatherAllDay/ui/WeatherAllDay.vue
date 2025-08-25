<script lang="ts" setup>
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Skeleton from 'primevue/skeleton';
import { ref } from 'vue';
import { useCity } from '@/entities/city';
import { useWeather } from '@/entities/weather';
import { AppIcon } from '@/shared/ui/AppIcon';
import { dataTablePreset } from '../model/settings.ts';

const city = useCity();
const weather = useWeather();

weather.initDayWeather({ city: city.currentCity.id });

const amberSwitch = ref(dataTablePreset);
</script>

<template>
  <div v-if="weather.allDayWeather.length" class="wt-all-day">
    <DataTable :value="weather.allDayWeather" table-style="font-size: inherit" :dt="amberSwitch">
      <Column field="time" header="">
        <template #body="slotProps">
          <div class="flex flex-col">
            <span class="whitespace-nowrap">{{ slotProps.data.time.time }}</span>
            <span>{{ slotProps.data.time.label }}</span>
          </div>
        </template>
      </Column>
      <Column field="currentTemp" header="">
        <template #body="slotProps">
          <div class="flex flex-col text-xl md:text-5xl font-semibold">
            {{ slotProps.data.currentTemp }}
          </div>
        </template>
      </Column>
      <Column field="description" header="">
        <template #body="slotProps">
          <div class="inline-flex items-center">
            <AppIcon :name="slotProps.data.icon" class="w-10 md:w-15 h-10 md:h-15" />
            <span class="hidden sm:inline-block ml-3">{{ slotProps.data.description }}</span>
          </div>
        </template>
      </Column>
      <Column field="windSpeed" header="" class="whitespace-nowrap">
        <template #body="slotProps">
          {{ slotProps.data.windSpeed }}
        </template>
      </Column>
      <Column field="humidity" header="" class="whitespace-nowrap">
        <template #body="slotProps">
          {{ slotProps.data.humidity }}
        </template>
      </Column>
    </DataTable>
  </div>
  <div v-else-if="weather.allDayWeatherLoading" class="flex flex-col space-y-2">
    <Skeleton v-for="item in 8" :key="item" height="2rem" />
  </div>
</template>

<style scoped lang="scss">
@use '@/shared/styles/media';

:deep(.p-datatable-thead) {
  display: none;
}

.wt-all-day {
  --wt-cell-padding: 10px;

  @include media.md {
    --wt-cell-padding: 15px;
  }
}
</style>
