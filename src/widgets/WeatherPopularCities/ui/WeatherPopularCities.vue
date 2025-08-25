<script lang="ts" setup>
import Skeleton from 'primevue/skeleton';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useCity } from '@/entities/city';
import { useWeather } from '@/entities/weather';
import { Title } from '@/features/Title';
import { WeatherCard } from '@/features/WeatherCard';
import { breakpoints } from '@/shared/config/breakpoints.ts';
import { popularCities } from '@/shared/constants/popularCities.ts';
import { Tooltip } from '@/shared/ui/Tooltip';
import { debounce } from '@/shared/utils/debounce.ts';
import 'swiper/css';
import 'swiper/css/pagination';

const modules = ref([Pagination]);
const swiperPaginationSetting = {
  clickable: true,
  el: '.weather-pop-cities__pagination',
  dynamicBullets: true,
  dynamicMainBullets: 4,
};
const swiperBreakpointsSetting = {
  '@0.00': {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  [breakpoints.sm]: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  [breakpoints.md]: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  [breakpoints.lg]: {
    slidesPerView: 4,
    spaceBetween: 25,
  },
  [breakpoints.xl]: {
    slidesPerView: 5,
    spaceBetween: 35,
  },
};

const screenWidth = ref(window.innerWidth);
const skeletonCount = computed(() => {
  if (screenWidth.value >= breakpoints.xl) {
    return 5;
  }
  if (screenWidth.value >= breakpoints.lg) {
    return 4;
  }
  if (screenWidth.value >= breakpoints.md) {
    return 3;
  }
  if (screenWidth.value >= breakpoints.sm) {
    return 2;
  }
  return 1;
});
const handleResize = debounce(() => {
  screenWidth.value = window.innerWidth;
}, 1000);
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const city = useCity();
const weather = useWeather();
weather.initWeatherPopularCites(popularCities);
</script>

<template>
  <div class="weather-pop-cities">
    <h5 class="flex items-center text-4xl">
      <Title title="Погода в популярных городах" />
      <Tooltip text="города миллионники" class="ml-2" />
    </h5>
    <div class="mt-3 md:mt-8">
      <template v-if="weather.weatherPopularCites.length">
        <Swiper
          :space-between="20"
          :pagination=" weather.weatherPopularCites.length > swiperPaginationSetting.dynamicMainBullets ? swiperPaginationSetting : false"
          :modules="modules"
          :breakpoints="swiperBreakpointsSetting"
        >
          <SwiperSlide v-for="cityData in weather.weatherPopularCites.filter(popCity => popCity.id !== city.currentCity.id)" :key="cityData.cityName">
            <WeatherCard :data="cityData" />
          </SwiperSlide>
        </Swiper>
        <div class="mt-3">
          <div class="weather-pop-cities__pagination" />
        </div>
      </template>
      <div v-else-if="weather.weatherPopularCitesLoading" class="flex justify-center">
        <Skeleton v-for="item in skeletonCount" :key="item" size="20rem" class="mr-5" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  --swiper-theme-color: #fff;
  transform: none;
  width: auto !important;
  display: flex;
  justify-content: center;
}

.weather-pop-cities .swiper-slide {
  height: auto;
}
</style>
