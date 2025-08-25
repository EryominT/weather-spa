<script lang="ts" setup>
import Skeleton from 'primevue/skeleton';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useCity } from '@/entities/city';
import { useWeather } from '@/entities/weather';
import { breakpoints } from '@/shared/config/breakpoints.ts';
import { AppIcon } from '@/shared/ui/AppIcon';
import { debounce } from '@/shared/utils/debounce.ts';
import 'swiper/css';
import 'swiper/css/pagination';

const modules = ref([Pagination]);
const swiperPaginationSetting = {
  clickable: true,
  el: '.weather-weak__pagination',
  dynamicBullets: true,
  dynamicMainBullets: 4,
};
const swiperBreakpointsSetting = {
  '@0.00': {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  [breakpoints.sm]: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  [breakpoints.md]: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  [breakpoints.lg]: {
    slidesPerView: 7,
    spaceBetween: 20,
  },
};

const screenWidth = ref(window.innerWidth);
const skeletonCount = computed(() => {
  if (screenWidth.value >= breakpoints.lg) {
    return 7;
  }
  if (screenWidth.value >= breakpoints.md) {
    return 6;
  }
  if (screenWidth.value >= breakpoints.sm) {
    return 5;
  }
  return 3;
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

weather.initWeakWeather({ city: city.currentCity.id });
</script>

<template>
  <div v-if="weather.weakWeather.length" class="weather-weak" style="max-width: 980px">
    <Swiper
      :space-between="20"
      :pagination=" weather.weatherPopularCites.length > swiperPaginationSetting.dynamicMainBullets ? swiperPaginationSetting : false"
      :modules="modules"
      :breakpoints="swiperBreakpointsSetting"
    >
      <SwiperSlide v-for="item in weather.weakWeather" :key="item.currentData">
        <div class="flex flex-col justify-center items-center">
          <div>{{ item.label }}</div>
          <div class="mt-2">
            <AppIcon :name="item.icon" />
          </div>
          <div class="mt-2">
            {{ item.currentTemp }}
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="mt-3">
      <div class="weather-weak__pagination" />
    </div>
  </div>
  <div v-else-if="weather.weakWeatherLoading" class="flex">
    <Skeleton v-for="item in skeletonCount" :key="item" size="8rem" class="mr-5" />
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
</style>
