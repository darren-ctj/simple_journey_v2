<script setup lang="ts">
import { Motion } from "motion-v";

withDefaults(
  defineProps<{
    className?: string;
    duration?: number;
  }>(),
  {
    duration: 2,
  },
);

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <div
    :class="['relative w-fit overflow-hidden', className]"
    @click="emit('click')"
  >
    <slot />

    <Motion
      aria-hidden="true"
      class="absolute inset-0 pointer-events-none"
      :initial="{ x: '-150%' }"
      :animate="{ x: '150%' }"
      :transition="{
        repeat: Infinity,
        duration,
        ease: 'linear',
        repeatDelay: 2,
      }"
    >
      <div
        class="w-full h-full"
        :style="{
          background:
            'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.175) 50%, rgba(255,255,255,0.05) 65%, transparent 100%)',
          transform: 'skewX(-20deg)',
          width: '40px',
          height: '200%',
          position: 'absolute',
          top: '-50%',
          left: '0',
        }"
      />
    </Motion>
  </div>
</template>
