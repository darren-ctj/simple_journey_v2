<script setup lang="ts">
import { motion } from "motion-v";
import {
  Layers,
  Server,
  MonitorSmartphone,
  Settings2,
  ArrowUpRight,
} from "@lucide/vue";
import { SERVICES } from "../constants/services";

const serviceIcons = [Layers, Server, MonitorSmartphone, Settings2];
</script>

<template>
  <section class="relative z-[1] w-screen overflow-hidden">
    <div
      class="relative container-wide flex flex-col items-start pt-28 pb-12 text-left lg:pt-32 lg:pb-20"
    >
      <!-- Section introduction -->
      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0 }"
        :viewport="{ once: true }"
        class="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-primary"
      >
        OUR SERVICES
      </motion.p>

      <motion.h2
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :viewport="{ once: true }"
        class="mb-4 max-w-2xl text-3xl font-medium leading-[1.2] tracking-tight md:text-4xl lg:text-5xl"
      >
        Comprehensive IT Solutions for Your Business
      </motion.h2>

      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.4 }"
        :viewport="{ once: true }"
        class="mb-8 w-full max-w-xl text-base text-muted-foreground max-sm:text-sm max-sm:leading-relaxed sm:mb-12"
      >
        From industry-specific solutions to intelligent digital transformation,
        we deliver the technology, infrastructure, and expertise your business
        needs to thrive.
      </motion.p>

      <!-- Services grid -->
      <div class="w-full overflow-hidden rounded-2xl border">
        <div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
          <motion.article
            v-for="(service, index) in SERVICES"
            :key="service.title"
            :initial="{ opacity: 0, y: 16, filter: 'blur(8px)' }"
            :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
            :transition="{ duration: 0.55, delay: 0.12 * index }"
            :viewport="{ once: true }"
            class="group relative min-h-[260px] overflow-hidden bg-background p-6 md:p-8"
          >
            <!-- Grid pattern decoration -->
            <div
              class="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full opacity-70"
              style="
                mask-image: radial-gradient(
                  farthest-side at top,
                  black,
                  transparent
                );
              "
            >
              <svg
                class="absolute inset-0 h-full w-full stroke-foreground/15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    :id="`service-grid-${index}`"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                    x="20"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="0.8"
                    />
                  </pattern>
                </defs>

                <rect
                  width="100%"
                  height="100%"
                  :fill="`url(#service-grid-${index})`"
                />
              </svg>
            </div>

            <!-- Service icon -->
            <div
              class="relative z-10 flex size-11 items-center justify-center rounded-xl border bg-surface-glass text-foreground/75 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary"
            >
              <component
                :is="serviceIcons[index]"
                class="size-5"
                :stroke-width="1.7"
              />
            </div>

            <!-- Service content -->
            <div class="relative z-10 mt-10">
              <div class="mb-3 flex items-center justify-between">
                <span
                  class="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/70"
                >
                  {{ String(index + 1).padStart(2, "0") }}
                </span>

                <ArrowUpRight
                  class="size-4 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </div>

              <h3
                class="mb-2 font-heading text-base font-medium text-foreground md:text-lg"
              >
                {{ service.title }}
              </h3>

              <p
                class="relative z-20 text-xs font-light leading-relaxed text-muted-foreground md:text-sm"
              >
                {{ service.description }}
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  </section>
</template>
