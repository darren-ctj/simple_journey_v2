<script setup lang="ts">
import { useInView, useMotionValue, useSpring } from "motion-v";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  class?: string;
  startWhen?: boolean;
  separator?: string;
}

const props = withDefaults(defineProps<CountUpProps>(), {
  from: 0,
  direction: "up",
  delay: 0,
  duration: 2,
  class: "",
  startWhen: true,
  separator: "",
});

const emit = defineEmits<{
  start: [];
  end: [];
}>();

const element = ref<HTMLElement | null>(null);

const initialValue = computed(() =>
  props.direction === "down" ? props.to : props.from,
);

const motionValue = useMotionValue(initialValue.value);

const damping = computed(() => 20 + 40 * (1 / props.duration));

const stiffness = computed(() => 100 * (1 / props.duration));

const springValue = useSpring(motionValue, {
  damping: damping.value,
  stiffness: stiffness.value,
});

const isInView = useInView(element, {
  once: true,
  margin: "0px",
});

function getDecimalPlaces(num: number): number {
  const str = num.toString();

  if (str.includes(".")) {
    const decimals = str.split(".")[1];

    if (parseInt(decimals) !== 0) {
      return decimals.length;
    }
  }

  return 0;
}

const maxDecimals = computed(() =>
  Math.max(getDecimalPlaces(props.from), getDecimalPlaces(props.to)),
);

function formatValue(latest: number): string {
  const hasDecimals = maxDecimals.value > 0;

  const options: Intl.NumberFormatOptions = {
    useGrouping: true,
    minimumFractionDigits: hasDecimals ? maxDecimals.value : 0,
    maximumFractionDigits: hasDecimals ? maxDecimals.value : 0,
  };

  let formattedNumber = new Intl.NumberFormat("id-ID", options).format(latest);

  if (props.separator) {
    formattedNumber = formattedNumber.replace(/\./g, props.separator);
  }

  return formattedNumber;
}

watch([initialValue, () => props.from, () => props.to], () => {
  motionValue.set(initialValue.value);

  if (element.value) {
    element.value.textContent = formatValue(initialValue.value);
  }
});

let animationTimeout: ReturnType<typeof setTimeout> | undefined;
let endTimeout: ReturnType<typeof setTimeout> | undefined;
let unsubscribe: (() => void) | undefined;

watch(
  [isInView, () => props.startWhen],
  ([inView, shouldStart]) => {
    clearTimeout(animationTimeout);
    clearTimeout(endTimeout);

    if (!inView || !shouldStart) return;

    emit("start");

    animationTimeout = setTimeout(() => {
      motionValue.set(props.direction === "down" ? props.from : props.to);
    }, props.delay * 1000);

    endTimeout = setTimeout(
      () => {
        emit("end");
      },
      (props.delay + props.duration) * 1000,
    );
  },
  { immediate: true },
);

onMounted(() => {
  unsubscribe = springValue.on("change", (latest: number) => {
    if (element.value) element.value.textContent = formatValue(latest);
  });

  if (element.value)
    element.value.textContent = formatValue(initialValue.value);
});

onUnmounted(() => {
  clearTimeout(animationTimeout);
  clearTimeout(endTimeout);
  unsubscribe?.();
});
</script>

<template>
  <span ref="element" :class="props.class" />
</template>
