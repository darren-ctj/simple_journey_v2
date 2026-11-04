<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect, useId } from "vue";

type LayerIcon = "bolt" | "database" | "plug" | "spark" | "pulse";

type LayerStackItem = {
  title: string;
  hint?: string;
  icon?: LayerIcon;
};

const props = withDefaults(
  defineProps<{
    items?: LayerStackItem[];
    defaultIndex?: number;
    interval?: number;
  }>(),
  {
    defaultIndex: 0,
    interval: 2600,
  },
);

const emit = defineEmits<{
  change: [index: number];
}>();

const defaultItems: LayerStackItem[] = [
  { title: "Triggered by events", hint: "Webhooks", icon: "bolt" },
  { title: "Grounded in your data", hint: "Context", icon: "database" },
  { title: "Connected to your apps", hint: "APIs", icon: "plug" },
  { title: "Works with any model", hint: "Routing", icon: "spark" },
  { title: "Traced at every step", hint: "Logs", icon: "pulse" },
];

const SIZE = 104;
const STEP = 26;
const GAP = 34;
const ABOVE = 24;
const THICK = 9;
const CX = 300;
const TOP = 109;

const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");

const list = computed(() =>
  (props.items?.length ? props.items : defaultItems).slice(0, 5),
);

const active = ref(
  Math.min(Math.max(props.defaultIndex, 0), list.value.length - 1),
);

const paused = ref(false);
const touched = ref(false);
const isClient = ref(false);

const renderedLayers = computed(() =>
  list.value.map((item, index) => ({ item, index })).reverse(),
);

const last = computed(() => list.value.length - 1);

function yOf(index: number) {
  return (
    TOP +
    index * STEP -
    (index < active.value
      ? GAP + ABOVE
      : index === active.value && active.value < last.value
        ? GAP
        : 0)
  );
}

const verticalOffset = computed(() => {
  const positions = list.value.map((_, index) => yOf(index));
  const minY = Math.min(...positions);
  const maxY = Math.max(...positions) + SIZE + THICK;

  return (400 - (maxY - minY)) / 2 - minY;
});

function onFocusOut(event: FocusEvent) {
  const root = event.currentTarget as HTMLElement;

  if (!root.contains(event.relatedTarget as Node | null)) {
    paused.value = false;
  }
}

// Keep the active index valid if the supplied items change.
watch(list, (items) => {
  active.value = Math.min(active.value, items.length - 1);
});

// Emit changes to the parent.
watch(active, (index) => {
  emit("change", index);
});

// Automatic cycling, paused on hover/focus and after manual interaction.
onMounted(() => {
  isClient.value = true;
});

watchEffect((onCleanup) => {
  if (
    !isClient.value ||
    paused.value ||
    touched.value ||
    list.value.length < 2
  ) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const timer = window.setInterval(
    () => {
      active.value = (active.value + 1) % list.value.length;
    },
    Math.max(1, props.interval),
  );

  onCleanup(() => window.clearInterval(timer));
});
</script>

<template>
  <div
    class="relative aspect-[3/2] w-full [container-type:inline-size] [--u:calc(100cqw/600)]"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="onFocusOut"
  >
    <svg
      class="absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 600 400"
      aria-hidden="true"
    >
      <defs>
        <filter
          :id="`${id}-glow`"
          x="-60%"
          y="-120%"
          width="220%"
          height="340%"
        >
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <g
        v-for="layer in renderedLayers"
        :key="layer.index"
        class="[transition:transform_560ms_cubic-bezier(0.65,0,0.25,1)]"
        :data-active="layer.index === active ? '' : undefined"
        :data-above="layer.index < active ? '' : undefined"
        :style="{
          transform: `translate(${CX}px, ${yOf(layer.index) + verticalOffset}px)`,
        }"
      >
        <!-- Glow -->
        <ellipse
          cx="0"
          :cy="SIZE / 2 + THICK + 18"
          rx="70"
          ry="24"
          :filter="`url(#${id}-glow)`"
          class="fill-[#2f6bff]/[0.28] opacity-0 transition-opacity duration-[420ms] ease-out"
          :class="{ 'opacity-100': layer.index === active }"
        />

        <!-- Layer thickness -->
        <g :transform="`translate(0 ${THICK}) matrix(1 0.5 -1 0.5 0 0)`">
          <rect
            :width="SIZE"
            :height="SIZE"
            rx="9"
            class="fill-[#ececef] stroke-[rgba(10,10,10,0.11)] [stroke-width:1] [vector-effect:non-scaling-stroke] transition-[fill,stroke] duration-[360ms] dark:fill-[#26262a] dark:stroke-[rgba(255,255,255,0.13)]"
            :class="{
              'fill-[rgba(236,236,239,0.55)] dark:fill-[rgba(38,38,42,0.5)]':
                layer.index < active,
            }"
          />
          <rect
            :width="SIZE"
            :height="SIZE"
            rx="9"
            class="fill-[#2557d9] opacity-0 transition-opacity duration-[360ms]"
            :class="{ 'opacity-100': layer.index === active }"
          />
        </g>

        <!-- Layer top face -->
        <g transform="matrix(1 0.5 -1 0.5 0 0)">
          <rect
            :width="SIZE"
            :height="SIZE"
            rx="9"
            class="fill-[rgba(255,255,255,0.6)] stroke-[rgba(10,10,10,0.11)] [stroke-width:1] [vector-effect:non-scaling-stroke] transition-[fill,stroke] duration-[360ms] dark:fill-[rgba(255,255,255,0.04)] dark:stroke-[rgba(255,255,255,0.13)]"
            :class="{
              'fill-[rgba(255,255,255,0.3)] dark:fill-[rgba(255,255,255,0.025)]':
                layer.index < active,
            }"
          />

          <!-- Active face -->
          <rect
            :width="SIZE"
            :height="SIZE"
            rx="9"
            class="fill-[#e9f0ff] stroke-[#2f6bff] [stroke-width:1.6] opacity-0 transition-opacity duration-[360ms] dark:fill-[#1f2c4d] dark:stroke-[#6b95ff]"
            :class="{ 'opacity-100': layer.index === active }"
          />

          <!-- Layer icon -->
          <g
            :transform="`translate(${SIZE / 2 - 18} ${SIZE / 2 - 18}) scale(1.5)`"
            class="fill-none stroke-[#2f6bff] [stroke-width:1.5] [stroke-linecap:round] [stroke-linejoin:round] opacity-0 transition-opacity duration-300 dark:stroke-[#6b95ff]"
            :class="{
              'opacity-100 [transition-delay:120ms]': layer.index === active,
            }"
          >
            <path
              v-if="(layer.item.icon ?? 'bolt') === 'bolt'"
              d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z"
            />

            <template v-else-if="layer.item.icon === 'database'">
              <ellipse cx="12" cy="6" rx="7" ry="3" />
              <path
                d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"
              />
            </template>

            <path
              v-else-if="layer.item.icon === 'plug'"
              d="M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 0 1-11 0V8ZM12 16.5V21"
            />

            <path
              v-else-if="layer.item.icon === 'spark'"
              d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7ZM18.5 15.5c.2 1.5.8 2.1 2.3 2.3-1.5.2-2.1.8-2.3 2.3-.2-1.5-.8-2.1-2.3-2.3 1.5-.2 2.1-1 2.3-2.3Z"
            />

            <path
              v-else-if="layer.item.icon === 'pulse'"
              d="M3 12h4l2.5-6 5 12 2.5-6h4"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>
