<script setup lang="ts">
import { useCity } from '@//entities/city';
import { useWeather } from '@/entities/weather';
import { Title } from '@/features/Title';
import { WeatherPopularCities } from '@/widgets/WeatherPopularCities';
import { WeatherWeak } from '@/widgets/WeatherWeak';

const city = useCity();
const weather = useWeather();
weather.initCurrentWeather({ city: city.currentCity.id });
</script>

<template>
  <div class="flex flex-col flex-grow">
    <Title :title="`Погода в городе ${weather.currentWeather?.cityName}`" :sub-title="weather.currentWeather?.currentData" :loading="weather.currentWeatherLoading" />

    <div class="mt-7 md:mt-12">
      <WeatherWeak />
    </div>

    <div class="mt-auto pt-6 md:pt-14">
      <WeatherPopularCities />
    </div>
  </div>
</template>
