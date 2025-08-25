<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <span
    v-tooltip.top="text"
    class="inline-flex justify-center items-center w-[25px] h-[25px] md:w-[38px] md:h-[38px] text-sm md:text-xl rounded-full bg-primary-gradient"
  >
    ?
  </span>
</template>
