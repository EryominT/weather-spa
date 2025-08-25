import type { City } from '@/entities/city/model/types.ts';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { cities } from './constants.ts';

export const useCity = defineStore('city', () => {
  const currentCity = ref<City>(cities[0]);

  return {
    currentCity,
  };
});
