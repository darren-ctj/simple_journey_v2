<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "sm" | "md";
    glow?: boolean;
  }>(),
  {
    size: "md",
    glow: false,
  },
);
</script>

<template>
  <span
    v-bind="$attrs"
    :class="[
      'inline-flex w-fit items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-primary-glow/20 bg-surface-glass font-medium leading-none text-secondary-foreground backdrop-blur-md',
      size === 'sm'
        ? 'min-h-[1.375rem] px-2.5 py-1 text-[0.6875rem]'
        : 'min-h-[1.625rem] px-3 py-1.5 text-xs',
      glow
        ? 'border-primary-glow/35 shadow-[0_0_18px_rgba(30,136,255,0.10),inset_0_1px_0_rgba(255,255,255,0.06)]'
        : '',
    ]"
  >
    <slot />
  </span>
</template>
