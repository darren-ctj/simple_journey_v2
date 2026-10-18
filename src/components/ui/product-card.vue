<script setup lang="ts">
defineProps<{
  badges: string[];
  image: string;
  title: string;
}>();
</script>

<template>
  <div
    class="w-full rounded-[12px] border border-white bg-black p-4 text-white transition-all duration-300 hover:scale-[1.02] hover:ease-in"
    :class="['max-[768px]:max-h-[50vh]']"
  >
    <div
      class="relative my-4 h-[30rem] overflow-hidden rounded-[16px] bg-white/10 shadow-[0_4px_30px_#0000001a] backdrop-blur-[1.4px]"
      :class="['max-[768px]:max-h-[35vh]']"
    >
      <div class="absolute left-[2%] top-[3%] flex flex-row gap-2">
        <span
          v-for="badge in badges"
          class="rounded-[12px] bg-[#323232] px-3 py-1 text-xs text-white"
        >
          {{ badge }}
        </span>
      </div>

      <img
        loading="lazy"
        fetchpriority="high"
        :src="image"
        :alt="title"
        class="block h-full w-full rounded-[12px] object-contain"
      />
    </div>

    <h3 class="mt-2 mb-4 text-base underline">
      {{ title }}
    </h3>
  </div>
</template>
