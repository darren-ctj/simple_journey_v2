<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { motion } from "motion-v";
import StatementHeading from "@/components/shared/statement-heading.vue";
import { SERVICES } from "../constants/service";

const wrapperRef = ref<HTMLElement | null>(null);

const activeIndex = ref(0);

const SCROLL_DISTANCE = 400;

const updateActiveCard = () => {
  const wrapper = wrapperRef.value;

  if (!wrapper) return;

  const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;

  const scrollDistance = Math.max(0, window.scrollY - wrapperTop);

  activeIndex.value = Math.min(
    Math.floor(scrollDistance / SCROLL_DISTANCE),
    SERVICES.length - 1,
  );
};

onMounted(() => {
  window.addEventListener("scroll", updateActiveCard, {
    passive: true,
  });

  updateActiveCard();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateActiveCard);
});
</script>

<template>
  <div ref="wrapperRef" class="relative container-wide bg-black">
    <section
      :class="[
        'sticky top-0 w-full text-[#e5e7eb]',
        'max-md:min-h-0 max-md:py-5',
        'min-h-screen py-20',
      ]"
    >
      <header class="mb-15 max-md:max-w-[80%] max-w-[500px]">
        <StatementHeading
          align="left"
          brand="OUR SERVICES"
          statement="Comprehensive IT Solutions for Your Business"
        />
      </header>

      <motion.div
        :class="[
          'relative h-[60vh] overflow-hidden',
          'max-md:h-auto max-md:min-h-[50vh]',
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
        <div :class="['relative h-full', 'max-md:h-[35rem]']">
          <article
            v-for="(service, index) in SERVICES"
            :key="index"
            :class="[
              'absolute left-0 right-0 top-0 flex h-[30rem] items-center gap-10 rounded-[10px] border-[0.5px] border-[#f7f3f3ee] bg-black p-10',
              'max-md:bottom-0 max-md:h-auto max-md:flex-col max-md:gap-0 max-md:p-[20px_30px]',
              'transition-all duration-300 ease-out',
              activeIndex === index
                ? 'translate-y-0 opacity-100 pointer-events-auto'
                : '-translate-y-4 opacity-0 pointer-events-none',
            ]"
            :aria-hidden="activeIndex !== index"
          >
            <template v-if="service.imageFirst">
              <div class="flex flex-1 justify-center">
                <video
                  :src="`/features/home/services${service.video}`"
                  autoplay
                  loop
                  muted
                  playsinline
                  :class="[
                    'h-[95%] w-full max-w-[70%] rounded-[12px] object-cover',
                    'max-md:max-w-full',
                  ]"
                />
              </div>

              <div class="flex-1">
                <h2
                  :class="[
                    'mb-5 text-[clamp(2rem,2.8vw,2.25rem)] font-medium leading-[150%] tracking-[-0.5px]',
                    'max-md:text-xl',
                  ]"
                >
                  {{ service.title }}
                </h2>

                <p
                  :class="[
                    'text-base font-normal leading-[175%] tracking-[0.02em]',
                    'max-md:text-sm',
                  ]"
                >
                  {{ service.description }}
                </p>
              </div>
            </template>

            <template v-else>
              <div class="flex-1">
                <h2
                  :class="[
                    'mb-5 text-[clamp(2rem,2.8vw,2.25rem)] font-medium leading-[150%] tracking-[-0.5px]',
                    'max-md:text-xl',
                  ]"
                >
                  {{ service.title }}
                </h2>

                <p
                  :class="[
                    'text-base font-normal leading-[175%] tracking-[0.02em]',
                    'max-md:text-sm',
                  ]"
                >
                  {{ service.description }}
                </p>
              </div>

              <div class="flex flex-1 justify-center">
                <video
                  :src="`/features/home/services${service.video}`"
                  autoplay
                  loop
                  muted
                  playsinline
                  :class="[
                    'h-[95%] w-full max-w-[70%] rounded-[12px] object-cover',
                    'max-md:max-w-full',
                  ]"
                />
              </div>
            </template>
          </article>
        </div>
      </motion.div>
    </section>

    <div
      :style="{
        height: `${(SERVICES.length - 1) * SCROLL_DISTANCE}px`,
      }"
      aria-hidden="true"
    />
  </div>
</template>
