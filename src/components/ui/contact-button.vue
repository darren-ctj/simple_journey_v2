<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    showIcon?: boolean;
  }>(),
  {
    label: "Contact Us",
    showIcon: true,
  },
);
</script>

<template>
  <button
    type="button"
    class="group w-full cursor-pointer rounded-full border-none bg-gradient-to-br from-[#1e88ff] to-[#1466a8] px-[22px] py-2.5 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(30,136,255,0.4)]"
  >
    <span
      class="flex w-full items-center justify-center gap-2 text-base font-medium"
    >
      {{ label }}

      <!-- <img
        v-if="showIcon"
        fetchpriority="high"
        src="/icons/right-arrow.webp"
        alt="Right Arrow"
        class="size-6 translate-x-0 transition-transform duration-500 ease-out group-hover:-translate-x-2.5"
      /> -->
    </span>
  </button>
</template>
