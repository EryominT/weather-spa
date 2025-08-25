<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import { useCity } from '@//entities/city';
import { useWeather } from '@/entities/weather';
import { Title } from '@/features/Title';
import { AppIcon } from '@/shared/ui/AppIcon';
import { WeatherAllDay } from '@/widgets/WeatherAllDay';
import { WeatherPopularCities } from '@/widgets/WeatherPopularCities';

const city = useCity();
const weather = useWeather();
weather.initCurrentWeather({ city: city.currentCity.id });
</script>

<template>
  <div>
    <Title
      :title="`Погода в городе ${weather.currentWeather?.cityName}`"
      :sub-title="weather.currentWeather?.currentData"
      :loading="weather.currentWeatherLoading"
    />

    <div class="flex justify-between md:items-start flex-wrap flex-col md:flex-row mt-5 md:mt-12">
      <div class="flex flex-wrap justify-start items-center flex-grow space-x-4 md:space-x-11">
        <div class="flex justify-center items-center">
          <AppIcon :name="weather.currentWeather?.icon || 'noFound'" class="w-[60px] h-[60px] md:w-[180px] md:h-[180px]" :loading="weather.currentWeatherLoading" />
        </div>
        <span class="text-5xl md:text-8xl font-bold">
          <Skeleton v-if="weather.currentWeatherLoading" size="5rem" />
          <template v-else-if="weather.currentWeather?.currentTemp && !weather.currentWeatherLoading">
            {{ weather.currentWeather.currentTemp }}
          </template>
        </span>
        <div class="flex flex-col space-y-0 md:space-y-3 font-medium text-lg md:text-2xl">
          <Skeleton v-if="weather.currentWeatherLoading" width="8rem" height="1rem" />
          <div v-else-if="weather.currentWeather?.description && !weather.currentWeatherLoading">
            {{ weather.currentWeather.description }}
          </div>

          <Skeleton v-if="weather.currentWeatherLoading" width="8rem" height="1rem" />
          <div v-else-if="weather.currentWeather?.humidity && !weather.currentWeatherLoading">
            Влажность {{ weather.currentWeather.humidity }}
          </div>

          <Skeleton v-if="weather.currentWeatherLoading" width="8rem" height="1rem" />
          <div v-else-if="weather.currentWeather?.windSpeed && !weather.currentWeatherLoading">
            Ветер {{ weather.currentWeather.windSpeed }}
          </div>
        </div>
      </div>
      <div class="flex-grow mt-5 md:mt-0">
        <WeatherAllDay />
      </div>
    </div>

    <div class="mt-6 md:mt-14 mb-5 md:mb-5">
      <WeatherPopularCities />
    </div>
  </div>
</template>
