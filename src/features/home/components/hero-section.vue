<script setup lang="ts">
import { motion } from "motion-v";
</script>

<template>
  <div class="relative">
    <video
      class="absolute inset-0 z-0 size-full object-cover"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
    >
      <source src="/features/home/hero-section-bg.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>

    <div class="absolute inset-0 z-[1] bg-panel/50" />

    <section
      :class="[
        'container-wide relative z-[2] text-white flex h-screen',
        // < 640px
        'max-sm:pb-12',
        // < 1024px
        'max-lg:flex-col max-lg:items-start max-lg:justify-end',
        'max-lg:pb-15',
        // > 1024px
        'items-end justify-between gap-4',
        'pb-20',
      ]"
    >
      <motion.div
        class="max-lg:max-w-[95%] max-w-1/2"
        :initial="{ y: 1000, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{
          duration: 1,
          ease: 'easeOut',
        }"
      >
        <span
          class="text-5xl font-medium leading-normal"
          :class="[
            // < 1024px
            'max-lg:text-[4vh]',
            // < 640px
            'max-sm:text-3xl',
          ]"
        >
          Accelerating Your Digital Transformation
        </span>
      </motion.div>

      <motion.div
        class="flex justify-end max-lg:max-w-full max-w-[380px]"
        :initial="{ y: 1000, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{
          duration: 1,
          delay: 0.2,
          ease: 'easeOut',
        }"
      >
        <span
          class="text-base leading-7"
          :class="[
            // < 1024px
            'max-lg:font-normal max-lg:leading-relaxed',
            // < 640px
            'max-sm:text-sm',
          ]"
        >
          Enterprise-grade solutions for scalable,<br />
          secure, and future-ready systems.
        </span>
      </motion.div>
    </section>
  </div>
</template>
