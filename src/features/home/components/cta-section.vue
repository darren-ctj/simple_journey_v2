<script setup lang="ts">
import { motion } from "motion-v";
import ContactButton from "@/components/ui/contact-button.vue";
</script>

<template>
  <section
    :class="[
      'container-narrow flex justify-between',
      'max-md:flex-col max-md:items-start max-md:gap-4 max-md:py-5',
      'items-center py-14',
    ]"
  >
    <div class="max-w-[700px] max-md:max-w-full">
      <motion.h1
        :class="[
          'mb-4.5 text-3xl font-bold leading-normal',
          'max-md:mb-3.5 max-md:text-xl max-md:font-medium',
          'max-md:tracking-[-0.5px]',
        ]"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{
          duration: 1,
          delay: 0.3,
        }"
        :in-view-options="{
          once: true,
          amount: 0.2,
        }"
      >
        Start Your IT Modernization Journey
      </motion.h1>

      <motion.p
        :class="[
          'max-w-[500px] text-sm leading-relaxed tracking-normal',
          'max-md:max-w-full max-md:text-xs',
        ]"
        :initial="{ opacity: 0 }"
        :whileInView="{ opacity: 1 }"
        :transition="{
          duration: 1,
          delay: 0.7,
        }"
        :in-view-options="{
          once: true,
          amount: 0.2,
        }"
      >
        We provide strategic guidance and end-to-end solutions tailored to your
        business needs.
      </motion.p>
    </div>

    <motion.div
      :initial="{ opacity: 0 }"
      :whileInView="{ opacity: 1 }"
      :transition="{
        duration: 1,
        delay: 1,
      }"
      :in-view-options="{
        once: true,
        amount: 0.2,
      }"
    >
      <RouterLink to="/contact" class="link-wrapper">
        <ContactButton label="Let's Get Started" />
      </RouterLink>
    </motion.div>
  </section>

  <section
    class="relative box-content min-h-[420px] max-w-full overflow-hidden py-12"
  >
    <img
      loading="lazy"
      fetchpriority="high"
      src="/features/home/cta-section-bg.webp"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 z-0 h-full w-full object-cover object-center"
    />

    <div
      class="absolute inset-0 z-[1] bg-[linear-gradient(90deg,#000000bf_0%,#0000008c_40%,#00000040_100%)]"
    />
  </section>
</template>
