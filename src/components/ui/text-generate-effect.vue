<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

const props = withDefaults(
  defineProps<{
    tag?: TextTag;
    words: string;
    class?: string;
    stagger?: number;
    duration?: number;
    highlights?: string[];
  }>(),
  {
    tag: "p",
    class: "",
    stagger: 0.1,
    duration: 0.3,
    highlights: () => [],
  },
);

const root = ref<HTMLElement | null>(null);

const isVisible = ref(false);

let observer: IntersectionObserver | undefined;

const tokens = computed(() => {
  const source = props.words;

  const highlights = [...props.highlights]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  const escaped = highlights.map((phrase) =>
    phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );

  const matcher = new RegExp([...escaped, "\\S+"].join("|"), "g");

  const items: Array<{
    id: number;
    prefix: string;
    text: string;
    highlighted: boolean;
  }> = [];

  let cursor = 0;
  let match: RegExpExecArray | null;
  let id = 0;

  while ((match = matcher.exec(source)) !== null) {
    items.push({
      id: id++,
      prefix: source.slice(cursor, match.index),
      text: match[0],
      highlighted: highlights.includes(match[0]),
    });

    cursor = match.index + match[0].length;
  }

  return { items, trailing: source.slice(cursor) };
});

const durationMs = computed(() => `${Math.max(0, props.duration) * 1000}ms`);

onMounted(() => {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    isVisible.value = true;
    return;
  }

  if (!("IntersectionObserver" in window)) {
    isVisible.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        isVisible.value = true;
        observer?.disconnect();
        observer = undefined;
      }
    },
    { threshold: 0.1 },
  );

  if (root.value) observer.observe(root.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <component :is="tag" ref="root" :class="props.class">
    <template v-for="token in tokens.items" :key="token.id">
      {{ token.prefix
      }}<span
        class="inline-block transition-[opacity,filter,transform] ease-out motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!blur-0 motion-reduce:!transition-none"
        :class="[
          isVisible
            ? 'translate-y-0 opacity-100 blur-0'
            : 'translate-y-[0.12em] opacity-0 blur-[10px]',
        ]"
        :style="{
          transitionDuration: durationMs,
          transitionDelay: `${token.id * Math.max(0, props.stagger) * 1000}ms`,
        }"
        >{{ token.text }}</span
      > </template
    >{{ tokens.trailing }}
  </component>
</template>
