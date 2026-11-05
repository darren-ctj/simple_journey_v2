<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({
  inheritAttrs: false,
});

interface MarqueeProps {
  class?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  reverse: false,
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
});

const attrs = useAttrs();

const containerClass = computed(() => [
  "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
  props.vertical ? "flex-col" : "flex-row",
  props.vertical
    ? "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
    : "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
  props.class,
]);

const itemClass = computed(() => [
  "flex shrink-0 justify-around gap-(--gap)",
  props.vertical
    ? "animate-marquee-vertical flex-col"
    : "animate-marquee flex-row",
  props.pauseOnHover && "group-hover:[animation-play-state:paused]",
  props.reverse && "[animation-direction:reverse]",
]);
</script>

<template>
  <div v-bind="attrs" :class="containerClass">
    <div v-for="i in repeat" :key="i" :class="itemClass">
      <slot />
    </div>
  </div>
</template>
