<script setup lang="ts">
import { ref } from "vue";
import StatementHeading from "@/components/shared/statement-heading.vue";
import WhyChooseUs from "./why-choose-us.vue";
import { useSlideDeck } from "@/composables/use-slide-deck.ts";

const sectionRef = ref<HTMLElement | null>(null);
const { currentIndex, handleWheel } = useSlideDeck(sectionRef, 2);
</script>

<template>
  <div>
    <section
      ref="sectionRef"
      class="relative h-screen overflow-hidden"
      @wheel="handleWheel"
    >
      <img
        fetchpriority="high"
        src="/features/home/about-section-bg.webp"
        alt=""
        aria-hidden="true"
        class="absolute left-0 top-0 z-0 h-full w-full object-cover object-center"
      />

      <div
        class="absolute inset-0 z-[1] bg-[radial-gradient(circle,#090f1633_0%,#050c1433_70%)]"
      />

      <div class="container-wide relative z-[2] flex flex-col text-white">
        <!-- Slide 1 -->
        <div
          :class="[
            'h-screen flex items-center justify-center transition-all duration-700',
            currentIndex === 0
              ? 'pointer-events-auto translate-y-0 opacity-100 order-first'
              : 'pointer-events-none translate-y-[30px] opacity-0 order-last',
          ]"
        >
          <StatementHeading
            :brand-delay="0.5"
            statement="PT Simple Journey is an IT consulting company and a provider of Infrastructure Solutions, Digital Solutions, Cross-Industry Solutions, and IT Operation Services."
          />
        </div>

        <!-- Slide 2 -->
        <div
          :class="[
            'relative h-screen flex items-center justify-center transition-all duration-700',
            currentIndex === 1
              ? 'pointer-events-auto translate-y-0 opacity-100 order-first'
              : 'pointer-events-none translate-y-[30px] opacity-0 order-last',
          ]"
        >
          <WhyChooseUs :execution="currentIndex === 1" />
        </div>
      </div>
    </section>
  </div>
</template>
