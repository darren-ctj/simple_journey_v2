<script setup lang="ts">
import TextGenerateEffect from "@/components/ui/text-generate-effect.vue";
import Button from "@/components/ui/button.vue";
import { motion } from "motion-v";
</script>

<template>
  <div
    class="relative w-screen h-[115vh] flex flex-col justify-center items-center text-center text-white"
  >
    <!-- Background Video -->
    <div class="absolute z-0 left-0 bottom-0 w-full h-full">
      <div class="w-full h-[38vh]" />
      <video
        class="w-full h-[77vh] object-cover"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
      >
        <source src="/features/home/hero-section-bg.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Background Overlay -->
    <div
      class="absolute z-[1] left-0 bottom-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 via-80% to-black/5"
    />

    <!-- Content -->
    <section class="relative z-2 container-wide">
      <TextGenerateEffect
        tag="h1"
        words="Accelerating Your Digital Transformation"
        class="text-4xl md:text-5xl lg:text-6xl font-medium leading-normal mb-5"
        :stagger="0.12"
        :duration="0.6"
      />

      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.3 }"
        :viewport="{ once: true }"
        class="w-full max-w-[640px] text-base leading-7 max-sm:text-sm max-sm:leading-relaxed mx-auto mb-6"
      >
        Building scalable, secure, and intelligent digital solutions that
        streamline operations, empower teams, and accelerate your business
        growth in an ever-evolving digital landscape.
      </motion.p>

      <RouterLink to="/contact">
        <Button variant="outline" size="lg" :glow="true">Contact Us</Button>
      </RouterLink>
    </section>
  </div>
</template>
