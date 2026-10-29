<script setup lang="ts">
import { computed } from "vue";
import { Motion } from "motion-v";

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

  return {
    items,
    trailing: source.slice(cursor),
  };
});

const transition = computed(() => ({
  duration: Math.max(0, props.duration),
  delay: 0,
  ease: [0.22, 1, 0.36, 1] as const,
}));
</script>

<template>
  <component :is="tag" :class="props.class">
    <template v-for="token in tokens.items" :key="token.id">
      {{ token.prefix
      }}<Motion
        as="span"
        class="inline-block"
        :initial="{
          opacity: 0,
          y: '0.12em',
          filter: 'blur(10px)',
        }"
        whileInView="visible"
        :viewport="{
          once: true,
          amount: 0.1,
        }"
        :variants="{
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              ...transition,
              delay: token.id * Math.max(0, props.stagger),
            },
          },
        }"
        >{{ token.text }}</Motion
      > </template
    >{{ tokens.trailing }}
  </component>
</template>
