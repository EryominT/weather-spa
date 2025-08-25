<script lang="ts" setup>
import Select from 'primevue/select';
import { ref } from 'vue';
import { useCity } from '@/entities/city';
import { cities } from '@/entities/city/model/constants.ts';
import { useWeather } from '@/entities/weather';
import { selectPreset } from '../model/settings.ts';

const city = useCity();
const weather = useWeather();

function updateWater() {
  weather.initCurrentWeather({ city: city.currentCity.id });
  weather.initDayWeather({ city: city.currentCity.id });
  weather.initWeakWeather({ city: city.currentCity.id });
}

const amberSwitch = ref(selectPreset);
</script>

<template>
  <Select
    v-model="city.currentCity"
    :options="cities"
    :dt="amberSwitch"
    option-label="name.ru"
    scroll-height="15rem"
    placeholder="Выберите город"
    class="inline-flex items-center text-sm md:text-xl w-full md:w-56"
    @change="updateWater"
  />
</template>

<style scoped>
:deep(.p-select-label) {
  font-size: inherit;
}
</style>
