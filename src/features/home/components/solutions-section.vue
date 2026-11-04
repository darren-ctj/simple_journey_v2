<script setup lang="ts">
import Button from "@/components/ui/button.vue";
import { motion } from "motion-v";
import { ArrowRight } from "@lucide/vue";
import TiltedGrid from "@/components/ui/tilted-grid.vue";

const images = [
  {
    src: "/features/home/solutions/solution-1.webp",
    alt: "Solution 1",
  },
  {
    src: "/features/home/solutions/solution-2.webp",
    alt: "Solution 2",
  },
  {
    src: "/features/home/solutions/solution-3.webp",
    alt: "Solution 3",
  },
  {
    src: "/features/home/solutions/solution-4.webp",
    alt: "Solution 4",
  },
];
</script>

<template>
  <section class="relative z-[1] w-screen overflow-hidden">
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
        OUR SOLUTIONS
      </motion.p>

      <motion.h2
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :viewport="{ once: true }"
        class="mb-4 max-w-2xl text-3xl font-medium leading-[1.2] tracking-tight md:text-4xl lg:text-5xl"
      >
        Delivering Scalable Digital Solutions That Support Operational
        Excellence
      </motion.h2>

      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.4 }"
        :viewport="{ once: true }"
        class="mb-8 w-full max-w-xl text-base text-muted-foreground max-sm:text-sm max-sm:leading-relaxed sm:mb-12"
      >
        Our products are developed to help organizations streamline processes,
        enhance efficiency, and adopt modern digital capabilities.
      </motion.p>

      <motion.div
        class="w-full"
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.6 }"
        :viewport="{ once: true }"
      >
        <TiltedGrid
          :images="images"
          :speed="8"
          :tile-height="38"
          :aspect-ratio="4 / 3"
          :gap="12"
          :axis="50"
          :curve="80"
          :fade="12"
          class="w-full h-120"
        />
      </motion.div>

      <motion.div
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :viewport="{ once: true }"
      >
        <Button variant="outline">
          View All Solutions
          <ArrowRight class="size-4" />
        </Button>
      </motion.div>
    </div>
  </section>
</template>
