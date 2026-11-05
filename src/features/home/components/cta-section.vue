<script setup lang="ts">
import Button from "@/components/ui/button.vue";
import ShinyWrapper from "@/components/ui/shiny-wrapper.vue";
import { ArrowRight } from "@lucide/vue";
import { motion } from "motion-v";
</script>

<template>
  <section
    class="relative z-[1] w-screen overflow-hidden px-4 sm:px-6 md:px-10 lg:px-12 py-20"
  >
    <motion.div
      :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
      :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :transition="{ duration: 0.6, delay: 0 }"
      :viewport="{ once: true }"
      class="container-narrow border-y border-dashed"
    >
      <div
        class="w-full flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 -mt-10 -mb-10 px-3 md:px-10 border-x border-dashed py-20"
      >
        <div>
          <p
            class="text-[10px] font-medium uppercase tracking-[0.28em] text-primary mb-3"
          >
            WORK WITH US
          </p>

          <h2 class="text-2xl font-medium mb-2">
            Start Your IT Modernization Journey
          </h2>

          <p class="text-muted-foreground max-w-md">
            We provide strategic guidance and end-to-end solutions tailored to
            your business needs.
          </p>
        </div>

        <ShinyWrapper class="rounded-full">
          <Button size="lg" variant="outline">
            Get Started
            <ArrowRight class="size-4" />
          </Button>
        </ShinyWrapper>
      </div>
    </motion.div>
  </section>
</template>
