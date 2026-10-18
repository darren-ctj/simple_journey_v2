<script setup lang="ts">
import { motion } from "motion-v";
import ContactButton from "@/components/ui/contact-button.vue";
</script>

<template>
  <div class="relative overflow-hidden">
    <img
      src="/features/products/cta-section-bg.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      fetchpriority="high"
      class="absolute inset-0 z-0 h-full w-full object-cover object-center"
    />

    <div
      class="absolute inset-0 z-[1] bg-[linear-gradient(90deg,#000000bf_0%,#0000008c_40%,#00000040_100%)]"
    />

    <section
      class="container-wide relative z-[2] py-22 text-left text-white max-md:py-5"
    >
      <motion.h1
        class="mb-3 mt-6 text-[clamp(2rem,2.8vw,2.25rem)] font-medium max-md:text-xl"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1, delay: 0.3 }"
      >
        Ready to Collaborate With Us?
      </motion.h1>

      <motion.p
        class="mb-5 max-w-[600px] text-base leading-[175%] tracking-[2%] max-md:max-w-[80%] max-md:text-sm"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1, delay: 0.7 }"
      >
        Discuss your business technology needs with the SimpleJourney team.
      </motion.p>

      <motion.div
        class="max-w-[200px]"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1, delay: 1 }"
      >
        <RouterLink to="/contact" class="link-wrapper block">
          <ContactButton label="Let's Get Started" />
        </RouterLink>
      </motion.div>
    </section>
  </div>
</template>
