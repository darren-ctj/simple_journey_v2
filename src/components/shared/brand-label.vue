<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    icon?: string;
  }>(),
  {
    icon: "/icons/diamond.webp",
  },
);
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <!-- <img
      loading="lazy"
      fetchpriority="low"
      :src="icon"
      alt="brand icon"
      class="size-[14px] object-contain"
    /> -->

    <span class="text-base text-primary">{{ label }}</span>
  </span>
</template>
