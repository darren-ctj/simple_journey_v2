<script setup lang="ts">
import { computed } from "vue";
import { motion } from "motion-v";

type ColorTheme = "blue" | "light-blue" | "soft-blue";

interface StepColors {
  bg: string;
  text: string;
  border: string;
}

interface Step {
  title: string;
  description: string;
  colorTheme?: ColorTheme;
  colors?: StepColors;
}

interface StepPosition {
  className: string;
}

interface Props {
  steps?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const props = withDefaults(defineProps<Props>(), {
  steps: () => [],
  className: "",
  stepPositions: undefined,
});

const defaultSteps: Step[] = [
  {
    title: "Consultation",
    description:
      "We understand your goals and requirements to shape the right strategy.",
    colorTheme: "blue",
  },
  {
    title: "Implementation",
    description: "We turn the strategy into reality with a seamless execution.",
    colorTheme: "light-blue",
  },
  {
    title: "Ongoing Maintenance",
    description: "We provide ongoing support and improvements.",
    colorTheme: "soft-blue",
  },
  {
    title: "Evaluation & Growth",
    description:
      "We analyze performance metrics and optimize for long-term scalability.",
    colorTheme: "light-blue",
  },
];

const defaultCardPositions: StepPosition[] = [
  { className: "rotate-8" },
  { className: "-rotate-8" },
  { className: "rotate-8" },
  { className: "-rotate-8" },
];

const defaultBgColors: Record<ColorTheme, string> = {
  blue: "rgba(30, 136, 255, 0.10)",
  "light-blue": "rgba(108, 182, 255, 0.10)",
  "soft-blue": "rgba(142, 174, 245, 0.10)",
};

const defaultTextColors: Record<ColorTheme, string> = {
  blue: "#1e88ff",
  "light-blue": "#6cb6ff",
  "soft-blue": "#8eaef5",
};

const defaultBorderColors: Record<ColorTheme, string> = {
  blue: "rgba(30, 136, 255, 0.22)",
  "light-blue": "rgba(108, 182, 255, 0.22)",
  "soft-blue": "rgba(142, 174, 245, 0.22)",
};

const data = computed(() => (props.steps?.length ? props.steps : defaultSteps));

const positions = computed(() =>
  props.stepPositions?.length ? props.stepPositions : defaultCardPositions,
);

const animationDuration = computed(() => Math.max(data.value.length * 5, 15));

function getCardColors(step: Step) {
  const theme = step.colorTheme ?? "blue";

  return {
    bg: step.colors?.bg ?? defaultBgColors[theme],
    text: step.colors?.text ?? defaultTextColors[theme],
    border: step.colors?.border ?? defaultBorderColors[theme],
  };
}

function getPosition(index: number) {
  return positions.value[index % positions.value.length];
}
</script>

<template>
  <div
    :class="[
      'absolute top-0 w-full h-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]',
      props.className,
    ]"
  >
    <motion.div
      class="flex flex-col gap-12 items-center"
      :initial="{ y: '0%' }"
      :animate="{ y: '-50%' }"
      :transition="{
        duration: animationDuration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      }"
    >
      <div v-for="copy in 2" :key="copy" class="flex flex-col gap-12">
        <div
          v-for="(step, index) in data"
          :key="`${copy}-${step.title}`"
          :class="[
            'w-[240px] transition-transform duration-300 hover:z-30 hover:scale-105',
            getPosition(index).className,
          ]"
        >
          <div class="bg-card p-1.5 rounded-xl border">
            <!-- Pin -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              :style="{ color: getCardColors(step).text }"
              class="w-6 h-6 z-20 mb-2 mx-auto drop-shadow-[0_0_10px_rgba(30,136,255,0.25)]"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z"
              />
            </svg>

            <!-- Card content -->
            <div
              class="border rounded-md p-3 h-full flex flex-col relative overflow-hidden"
              :style="{
                backgroundColor: getCardColors(step).bg,
                borderColor: getCardColors(step).border,
              }"
            >
              <!-- Subtle glow -->
              <div
                class="absolute -top-16 -right-16 size-32 rounded-full blur-3xl pointer-events-none"
                :style="{
                  backgroundColor: getCardColors(step).text,
                  opacity: 0.12,
                }"
              />

              <span
                class="relative text-xl font-semibold mb-3"
                :style="{ color: getCardColors(step).text }"
              >
                {{ `0${index + 1}` }}
              </span>

              <h3
                class="relative text-lg font-semibold leading-tight mb-2 text-foreground"
              >
                {{ step.title }}
              </h3>

              <p
                class="relative text-muted-foreground text-[11px] tracking-tight"
              >
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</template>
