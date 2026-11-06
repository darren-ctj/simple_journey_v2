<script setup lang="ts">
import { computed } from "vue";
import { motion } from "motion-v";
import {
  TESTIMONIALS,
  TESTIMONIAL_DELAYS,
  TESTIMONIAL_DURATIONS,
} from "../constants/testimonials";
import TestimonialCard from "./testimonial-card.vue";
import Marquee from "@/components/ui/marquee.vue";

const MOBILE_TESTIMONIALS = computed(() => TESTIMONIALS.flat());
</script>

<template>
  <section class="relative z-[1] w-screen overflow-hidden">
    <div
      class="pointer-events-none absolute top-0 left-1/2 size-225 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
      style="background: radial-gradient(circle, #1e88ff 0%, transparent 65%)"
    />

    <div
      class="relative container-wide flex flex-col items-start sm:items-center text-left sm:text-center pt-28 pb-12 text-left lg:pt-32 lg:pb-20"
    >
      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0 }"
        :viewport="{ once: true }"
        class="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-primary"
      >
        OUR TESTIMONIALS
      </motion.p>

      <motion.h2
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :viewport="{ once: true }"
        class="mb-4 max-w-2xl text-3xl font-medium leading-[1.2] tracking-tight md:text-4xl lg:text-5xl"
      >
        What They Say About Us
      </motion.h2>

      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.4 }"
        :viewport="{ once: true }"
        class="mb-8 w-full max-w-xl text-base text-muted-foreground max-sm:text-sm max-sm:leading-relaxed sm:mb-12"
      >
        Take a moment to hear from the individuals who have experienced the
        unique difference we make, and discover why they trust us with their
        most important needs.
      </motion.p>

      <motion.div
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.4 }"
        :viewport="{ once: true }"
        class="relative h-150 overflow-hidden"
      >
        <div class="h-full md:hidden">
          <Marquee
            vertical
            :repeat="3"
            :pause-on-hover="true"
            delay="0s"
            duration="35s"
            class="h-full"
          >
            <TestimonialCard
              v-for="(item, index) in MOBILE_TESTIMONIALS"
              :key="index"
              v-bind="item"
            />
          </Marquee>
        </div>

        <div class="hidden h-full grid-cols-3 gap-2 md:grid">
          <Marquee
            v-for="(items, index) in TESTIMONIALS"
            :key="index"
            vertical
            :repeat="3"
            :pause-on-hover="true"
            :delay="TESTIMONIAL_DELAYS[index]"
            :duration="TESTIMONIAL_DURATIONS[index]"
            class="h-full"
          >
            <TestimonialCard
              v-for="(item, itemIndex) in items"
              :key="itemIndex"
              v-bind="item"
            />
          </Marquee>
        </div>
      </motion.div>
    </div>

    <video
      class="absolute -z-[1] left-0 bottom-0 w-full h-2/5 object-cover opacity-60 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%),linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%),linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)] [-webkit-mask-composite:source-in]"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
    >
      <source
        src="/features/home/testimonials/testimonials-section-bg.webm"
        type="video/webm"
      />
    </video>
  </section>
</template>
