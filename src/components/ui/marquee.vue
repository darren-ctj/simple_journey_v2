<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({
  inheritAttrs: false,
});

interface MarqueeProps {
  class?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  reverse: false,
  pauseOnHover: false,
  repeat: 4,
});

const attrs = useAttrs();

const containerClass = computed(() => [
  "group flex flex-row gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
  props.class,
]);

const itemClass = computed(() => [
  "flex shrink-0 justify-around gap-(--gap)",
  "animate-marquee flex-row",
  "group-hover:[animation-play-state:paused]",
  "[animation-direction:reverse]",
]);
</script>

<template>
  <div v-bind="attrs" :class="containerClass">
    <div v-for="i in repeat" :key="i" :class="itemClass">
      <slot />
    </div>
  </div>
</template>
