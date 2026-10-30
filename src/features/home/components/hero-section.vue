<script setup lang="ts">
import Button from "@/components/ui/button.vue";
import Badge from "@/components/ui/badge.vue";
import { motion } from "motion-v";
import { ArrowRight } from "@lucide/vue";
import ShinyWrapper from "@/components/ui/shiny-wrapper.vue";
import Marquee from "@/components/ui/marquee.vue";
</script>

<template>
  <div class="relative z-[1] w-screen">
    <!-- Background Video -->
    <div class="absolute z-0 left-0 bottom-0 w-full h-full">
      <div
        class="w-full h-[30%] bg-gradient-to-b from-[#071426] to-[#0f0f16]"
      />

      <video
        class="w-full h-[70%] object-cover"
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
    <section
      class="relative z-[2] container-wide flex flex-col items-center text-center pt-32 pb-24 lg:pt-42 lg:pb-32"
    >
      <motion.div
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0 }"
        :viewport="{ once: true }"
      >
        <Badge class="pl-1.5 mb-7">
          <div
            class="tracking-widest text-background bg-secondary-foreground text-[10px] px-1.5 py-1 rounded-sm mr-0.5"
          >
            EST. 2018
          </div>

          IT Services and IT Consulting
        </Badge>
      </motion.div>

      <motion.h1
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :viewport="{ once: true }"
        class="text-4xl md:text-5xl lg:text-6xl max-w-2xl font-medium leading-[1.2] tracking-tight mb-4"
      >
        Accelerating Your Digital Transformation
      </motion.h1>

      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.4 }"
        :viewport="{ once: true }"
        class="w-full max-w-2xl text-base text-muted-foreground max-sm:text-sm max-sm:leading-relaxed mx-auto mb-7"
      >
        Building scalable, secure, and intelligent digital solutions that
        streamline operations, empower teams, and accelerate your business
        growth in an ever-evolving digital landscape.
      </motion.p>

      <motion.div
        class="flex items-center gap-2"
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.6 }"
        :viewport="{ once: true }"
      >
        <ShinyWrapper class="rounded-full">
          <Button variant="outline">
            Get Started
            <ArrowRight class="size-4" />
          </Button>
        </ShinyWrapper>

        <Button variant="ghost">View Services</Button>
      </motion.div>

      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0 }"
        :viewport="{ once: true }"
        class="mt-18 mb-4 text-[10px] uppercase tracking-widest text-muted-foreground"
      >
        Trusted by 12+ companies
      </motion.p>

      <motion.div
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :viewport="{ once: true }"
        class="w-full max-w-3xl"
      >
        <Marquee :pause-on-hover="true" class="[--duration:30s]">
          <div
            v-for="(logo, index) in [
              { name: 'Bolt', src: '/features/home/trusted-by/bolt.svg' },
              { name: 'Claude', src: '/features/home/trusted-by/claude.svg' },
              {
                name: 'Firebase',
                src: '/features/home/trusted-by/firebase.svg',
              },
              {
                name: 'Supabase',
                src: '/features/home/trusted-by/supabase.svg',
              },
              { name: 'Beacon', src: '/features/home/trusted-by/beacon.svg' },
              { name: 'Hulu', src: '/features/home/trusted-by/hulu.svg' },
              { name: 'Spotify', src: '/features/home/trusted-by/spotify.svg' },
            ]"
            :key="index"
            class="flex items-center justify-center h-10 w-28 rounded-lg bg-secondary-foreground/75"
          >
            <img
              :src="logo.src"
              :alt="logo.name"
              class="h-4 w-auto brightness-0"
            />
          </div>
        </Marquee>
      </motion.div>
    </section>
  </div>
</template>
