<script setup lang="ts">
import { motion } from "motion-v";
import StatementHeading from "@/components/shared/statement-heading.vue";
import FeatureCard from "@/components/shared/feature-card.vue";
import {
  LEFT_FEATURES,
  RIGHT_FEATURES,
  STATEMENT,
} from "@/features/home/constants/feature";
import {
  HEADING_ANIMATION,
  // MOBILE_CARD_OFFSETS,
} from "../constants/why-choose-us";

const props = withDefaults(defineProps<{ execution?: boolean }>(), {
  execution: false,
});

function cardAnimation(offset = 0) {
  const hidden = { opacity: 0, scale: 0.5, y: offset };
  const shown = { opacity: 1, scale: 1, y: offset };

  return {
    initial: hidden,
    animate: props.execution ? shown : hidden,
    transition: { duration: 0.6, ease: "easeOut" as const },
  };
}

function headingTarget() {
  return props.execution ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 };
}
</script>

<template>
  <div
    :class="[
      'absolute inset-0 z-0',
      'bg-[radial-gradient(circle,#090f1633_0%,#050c1433_70%)]',
    ]"
  />

  <!-- Desktop layout -->
  <div
    :class="[
      'h-full grid items-center gap-8',
      'max-lg:grid-cols-1 max-lg:text-center',
      'xl:gap-32',
      'grid-cols-[1fr_1.2fr_1fr]',
    ]"
  >
    <div
      :class="[
        'flex flex-col max-lg:gap-8 gap-36',
        'max-lg:items-center',
        // 'max-md:hidden',
      ]"
    >
      <motion.div
        v-for="feature in LEFT_FEATURES"
        :key="feature.number"
        class="will-change-transform"
        v-bind="cardAnimation()"
      >
        <FeatureCard v-bind="feature" />
      </motion.div>
    </div>

    <motion.div
      :class="[
        'block max-w-[560px] text-center',
        // 'max-md:hidden'
      ]"
      :initial="HEADING_ANIMATION.initial"
      :animate="headingTarget()"
      :transition="HEADING_ANIMATION.transition"
    >
      <StatementHeading brand="WHY CHOOSE US" :statement="STATEMENT" />
    </motion.div>

    <div
      :class="[
        'flex flex-col max-lg:gap-8 gap-36',
        'max-lg:items-center',
        // 'max-md:hidden',
      ]"
    >
      <motion.div
        v-for="feature in RIGHT_FEATURES"
        :key="feature.number"
        class="will-change-transform"
        v-bind="cardAnimation()"
      >
        <FeatureCard v-bind="feature" />
      </motion.div>
    </div>
  </div>

  <!-- Mobile layout -->
  <!-- <div
    :class="[
      'hidden',
      'max-md:flex max-md:flex-col',
      'max-md:items-center max-md:justify-center',
      'max-md:gap-0',
    ]"
  >
    <motion.div
      class="block max-w-full text-center"
      :initial="HEADING_ANIMATION.initial"
      :animate="headingTarget()"
      :transition="HEADING_ANIMATION.transition"
    >
      <StatementHeading brand="WHY CHOOSE US" :statement="STATEMENT" />
    </motion.div>

    <div class="hidden flex-col gap-4 max-md:flex">
      <motion.div
        v-for="feature in LEFT_FEATURES"
        :key="`mobile-${feature.number}`"
        class="will-change-transform"
        v-bind="cardAnimation(MOBILE_CARD_OFFSETS[feature.number])"
      >
        <FeatureCard v-bind="feature" />
      </motion.div>
    </div>

    <div class="hidden flex-col gap-4 max-md:flex">
      <motion.div
        v-for="feature in RIGHT_FEATURES"
        :key="`mobile-${feature.number}`"
        class="will-change-transform"
        v-bind="cardAnimation(MOBILE_CARD_OFFSETS[feature.number])"
      >
        <FeatureCard v-bind="feature" />
      </motion.div>
    </div>
  </div> -->
</template>
