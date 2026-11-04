<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type CSSProperties,
} from "vue";

interface TiltedGridImage {
  src: string;
  alt?: string;
}

interface Props {
  images: TiltedGridImage[];
  speed?: number;
  tileHeight?: number;
  aspectRatio?: number;
  gap?: number;
  axis?: number;
  curve?: number;
  fade?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  speed: 4,
  tileHeight: 26,
  aspectRatio: 16 / 9,
  gap: 6,
  axis: 56,
  curve: 80,
  fade: 12,
  class: "",
});

const SLICES = 16;
const CAMERA = 1.6;
const MAX_WIDTH = 55;

interface Layout {
  columns: number;
  sweep: number;
  unit: number;
  limit: number;
}

const container = ref<HTMLDivElement | null>(null);
const layout = ref<Layout | null>(null);
const shown = ref<Record<number, number>>({});

let resizeObserver: ResizeObserver | null = null;

const uid = `tgh-${Math.random().toString(36).slice(2, 10)}`;
const orbit = `${uid}-orbit`;
const tile = `${uid}-tile`;

const bend = computed(
  () => (Math.min(85, Math.max(5, props.curve)) * Math.PI) / 180,
);

function arc(angle: number) {
  return (CAMERA - 1 + Math.cos(angle)) / (2 * CAMERA * Math.sin(angle));
}

function measure(
  width: number,
  height: number,
  tileSize: number,
  aspect: number,
  gap: number,
  angle: number,
): Layout {
  const h = Math.min(
    (tileSize / 100) * height,
    ((MAX_WIDTH / 100) * width) / aspect,
  );

  const radius = width * arc(angle);

  if (!(h > 0) || !(radius > 0)) {
    return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  }

  const deg = (rad: number) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const limit = deg(angle) + (aspect * unit) / 2;

  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));

  const round = (n: number) => +n.toFixed(4);
  const sweep = round((columns * pitch) / 2);

  return {
    columns,
    sweep,
    unit: round(unit),
    limit: round(Math.min(sweep, limit)),
  };
}

function updateLayout() {
  if (!container.value) return;

  const { width, height } = container.value.getBoundingClientRect();

  const next = measure(
    width,
    height,
    props.tileHeight,
    props.aspectRatio,
    props.gap,
    bend.value,
  );

  layout.value = next;
}

onMounted(() => {
  if (!container.value) return;

  resizeObserver = new ResizeObserver(updateLayout);
  resizeObserver.observe(container.value);

  updateLayout();
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});

watch(
  () => [props.tileHeight, props.aspectRatio, props.gap, props.curve],
  updateLayout,
);

watch(
  () => props.images,
  (images) => {
    images.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  },
  { immediate: true },
);

const fallbackLayout = computed(() =>
  measure(
    1200,
    560,
    props.tileHeight,
    props.aspectRatio,
    props.gap,
    bend.value,
  ),
);

const currentLayout = computed(() => layout.value ?? fallbackLayout.value);

const columns = computed(() => currentLayout.value.columns);
const sweep = computed(() => currentLayout.value.sweep);
const unit = computed(() => currentLayout.value.unit);
const limit = computed(() => currentLayout.value.limit);

function u(n: number) {
  return `calc(${+n.toFixed(4)} * min(${props.tileHeight}cqh, ${+(
    MAX_WIDTH / props.aspectRatio
  ).toFixed(4)}cqw))`;
}

const r = computed(() => 100 * arc(bend.value));

const radius = computed(() => `${+r.value.toFixed(3)}cqw`);

function turn(deg: number) {
  return `translateZ(${radius.value}) rotateY(${+deg.toFixed(
    4,
  )}deg) translateZ(-${radius.value})`;
}

const hide = computed(
  () =>
    +(((sweep.value - limit.value) / (2 * sweep.value || 1)) * 100).toFixed(4),
);

const duration = computed(() => columns.value * props.speed);

const mask = computed(
  () =>
    `linear-gradient(90deg, transparent, #000 ${props.fade}%, #000 ${
      100 - props.fade
    }%, transparent)`,
);

const css = computed(() => {
  const h = hide.value;

  return `
    @keyframes ${orbit} {
      from {
        transform: ${turn(-sweep.value)};
      }
      to {
        transform: ${turn(sweep.value)};
      }

      0%, ${h}%, ${100 - h}%, 100% {
        visibility: hidden;
      }

      ${h + 0.001}%, ${100 - h - 0.001}% {
        visibility: visible;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .${tile} {
        animation-play-state: paused !important;
      }
    }
  `;
});

function onAnimationIteration(event: AnimationEvent, t: number, first: number) {
  const lap = Math.round(event.elapsedTime / duration.value);
  const next = lap * columns.value + first;

  if (shown.value[t] === next) return;

  shown.value = {
    ...shown.value,
    [t]: next,
  };
}

function getImage(t: number, first: number): TiltedGridImage | undefined {
  if (!props.images.length) return undefined;

  const index = (shown.value[t] ?? first) % props.images.length;

  return props.images[index];
}

function tileStyle(t: number): CSSProperties {
  return {
    left: `calc(50% - ${u(props.aspectRatio / 2)})`,
    top: `calc(${props.axis}% - ${u(0.5)})`,
    width: u(props.aspectRatio),
    height: u(1),
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
    animation: `${orbit} ${duration.value}s linear ${-t * props.speed}s infinite`,
  };
}

function sliceStyle(k: number): CSSProperties {
  const share = props.aspectRatio / SLICES;

  return {
    left: u((props.aspectRatio - share) / 2),
    width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
    height: u(1),
    transform: turn((props.aspectRatio / 2 - (k + 0.5) * share) * unit.value),
    backfaceVisibility: "hidden",
  };
}

function imageStyle(k: number): CSSProperties {
  const share = props.aspectRatio / SLICES;

  return {
    left: u(-k * share),
    width: u(props.aspectRatio),
    height: u(1),
  };
}
</script>

<template>
  <div
    ref="container"
    :class="['relative overflow-hidden', props.class]"
    style="container-type: size"
  >
    <component is="style">{{ css }}</component>

    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 transition-opacity duration-500"
      :style="{
        opacity: layout ? 1 : 0,
        perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
        perspectiveOrigin: `50% ${axis}%`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }"
    >
      <div
        v-for="t in columns"
        :key="t - 1"
        :class="[tile, 'absolute']"
        :style="tileStyle(t - 1)"
        @animationiteration="onAnimationIteration($event, t - 1, columns - t)"
      >
        <div
          v-for="k in SLICES"
          :key="k - 1"
          :class="[
            'absolute top-0 overflow-hidden',
            k === 1 && 'rounded-l-lg',
            k === SLICES && 'rounded-r-lg',
          ]"
          :style="sliceStyle(k - 1)"
        >
          <img
            v-if="getImage(t - 1, columns - t)"
            :src="getImage(t - 1, columns - t)?.src"
            :alt="k === 1 ? (getImage(t - 1, columns - t)?.alt ?? '') : ''"
            draggable="false"
            class="absolute top-0 max-w-none object-cover"
            :style="imageStyle(k - 1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
