<script setup lang="ts">
import { motion } from "motion-v";

interface StatementHeadingProps {
  brand?: string;
  statement: string;
  align?: "center" | "left";
}

withDefaults(defineProps<StatementHeadingProps>(), {
  brand: "SIMPLE JOURNEY",
  align: "center",
});
</script>

<template>
  <section :class="[align === 'left' ? 'text-left' : 'text-center']">
    <div class="max-w-[1100px]">
      <motion.div
        class="inline-flex items-center gap-[10px]"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{
          duration: 1,
          ease: 'easeInOut',
          delay: 0.3,
        }"
      >
        <!-- <img
          loading="lazy"
          fetchpriority="low"
          src="/icons/diamond.webp"
          alt="brand icon"
          class="size-[14px] object-contain"
        /> -->

        <span
          class="text-base max-[640px]:text-xs max-[640px]:font-bold text-primary"
        >
          {{ brand }}
        </span>
      </motion.div>

      <motion.h1
        class="max-[1024px]:my-3 my-6 font-sans text-[clamp(2rem,2.8vw,2.25rem)] font-medium leading-[150%] tracking-[-0.5px]"
        :class="[
          // <= 640px
          'max-[640px]:text-[20px]',
          'max-[640px]:leading-[1.6]',
          // <= 1024px
          'max-[1024px]:text-[24px]',
        ]"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{
          duration: 1,
          ease: 'easeInOut',
          delay: 1,
        }"
      >
        {{ statement }}
      </motion.h1>
    </div>
  </section>
</template>
