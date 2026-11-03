<script setup lang="ts">
import { motion } from "motion-v";
import { ArrowUpRight, Check, Sparkles, Target } from "@lucide/vue";
import {
  WHY_CHOOSE_US_FEATURES,
  WHY_CHOOSE_US_STAGES,
} from "../constants/why-choose-us";
// import LogoCluster from "./logo-cluster.vue";
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
        WHY CHOOSE US
      </motion.p>

      <motion.h2
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :viewport="{ once: true }"
        class="mb-4 max-w-2xl text-3xl font-medium leading-[1.2] tracking-tight md:text-4xl lg:text-5xl"
      >
        The Right Expertise to Move Your Business Forward
      </motion.h2>

      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.4 }"
        :viewport="{ once: true }"
        class="mb-8 w-full max-w-xl text-base text-muted-foreground max-sm:text-sm max-sm:leading-relaxed sm:mb-12"
      >
        We combine proven expertise, thoughtful execution, and dependable
        technology to deliver solutions that fit your business and evolve with
        it.
      </motion.p>

      <!-- Feature cards -->
      <div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        <motion.article
          v-for="(feature, index) in WHY_CHOOSE_US_FEATURES"
          :key="feature.number"
          :initial="{ opacity: 0, y: 16, filter: 'blur(8px)' }"
          :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.55, delay: 0.12 * index }"
          :viewport="{ once: true }"
          class="group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border bg-surface-glass px-7 pt-7 pb-6 sm:min-h-[360px] sm:px-8 sm:pt-8"
        >
          <div
            class="relative flex items-center justify-center overflow-hidden"
          >
            <!-- Experienced & Proven Team -->
            <div
              v-if="feature.visual === 'team'"
              class="relative aspect-[3/2] w-full overflow-hidden rounded-2xl p-5 sm:p-8"
              role="img"
              aria-label="Illustration of teammates connecting and inviting a new team member"
            >
              <!-- Background decoration -->
              <div
                class="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10"
              />

              <div
                class="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10"
              />

              <!-- Connection lines -->
              <svg
                viewBox="0 0 600 400"
                class="absolute inset-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M150 205 C220 205 220 205 285 205"
                  class="stroke-blue-300 dark:stroke-blue-800"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <path
                  d="M285 205 C350 205 350 205 430 205"
                  class="stroke-blue-300 dark:stroke-blue-800"
                  stroke-width="3"
                  stroke-dasharray="7 8"
                  stroke-linecap="round"
                />
                <path
                  d="M285 205 C350 205 350 205 430 205"
                  class="stroke-blue-500"
                  stroke-width="3"
                  stroke-linecap="round"
                  pathLength="1"
                />
              </svg>

              <!-- Existing teammate 1 -->
              <motion.div
                :initial="{ opacity: 0, y: 12 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6 }"
                class="absolute left-[12%] top-[36%] z-10 flex flex-col items-center gap-3"
              >
                <div
                  class="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-orange-100 shadow-lg dark:border-slate-800 dark:bg-orange-950 sm:h-24 sm:w-24"
                >
                  <img
                    src="https://i.pravatar.cc/150?img=11"
                    alt="Ahmad Rizky"
                    class="h-full w-full object-cover rounded-full"
                  />

                  <span
                    class="absolute bottom-0 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-emerald-500 dark:border-slate-800"
                  />
                </div>
                <div
                  class="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:border-blue-900 dark:bg-slate-900 dark:text-slate-200"
                >
                  Ahmad Rizky
                </div>
              </motion.div>

              <!-- Existing teammate 2 -->
              <motion.div
                :initial="{ opacity: 0, y: 12 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, delay: 0.15 }"
                class="absolute left-[42%] top-[36%] z-10 flex flex-col items-center gap-3"
              >
                <div
                  class="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-indigo-100 shadow-lg dark:border-slate-800 dark:bg-indigo-950 sm:h-24 sm:w-24"
                >
                  <img
                    src="https://i.pravatar.cc/150?img=5"
                    alt="Sari Dewi"
                    class="h-full w-full object-cover rounded-full"
                  />

                  <span
                    class="absolute bottom-0 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-emerald-500 dark:border-slate-800"
                  />
                </div>
                <div
                  class="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:border-blue-900 dark:bg-slate-900 dark:text-slate-200"
                >
                  Sari Dewi
                </div>
              </motion.div>

              <!-- Invite slot -->
              <motion.div
                :animate="{ scale: [1, 1.04, 1] }"
                :transition="{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }"
                class="absolute right-[12%] top-[36%] z-10 flex flex-col items-center gap-3"
              >
                <div
                  class="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-blue-400 bg-white/70 shadow-sm dark:border-blue-600 dark:bg-slate-900/70 sm:h-24 sm:w-24"
                >
                  <span
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
                  >
                    <icon name="plus" size="xl" />
                  </span>
                </div>
                <div
                  class="rounded-full border border-dashed border-blue-300 bg-white/80 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-300"
                >
                  Budi Santoso
                </div>
              </motion.div>

              <!-- Incoming teammate -->
              <motion.div
                :initial="{ x: 100, y: 80, opacity: 0 }"
                :animate="{
                  x: [100, 65, 0, 0],
                  y: [80, 35, 0, 0],
                  opacity: [0, 1, 1, 1],
                }"
                :transition="{
                  duration: 3.6,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  times: [0, 0.45, 0.75, 1],
                  ease: 'easeInOut',
                }"
                class="absolute right-[12%] top-[36%] z-20 flex flex-col items-center gap-3"
              >
                <div
                  class="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-emerald-100 shadow-xl ring-4 ring-blue-400/20 dark:border-slate-800 dark:bg-emerald-950 sm:h-24 sm:w-24"
                >
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Budi Santoso"
                    class="h-full w-full object-cover rounded-full"
                  />

                  <span
                    class="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-emerald-500 text-white dark:border-slate-800"
                  >
                    <icon name="check" size="xs" />
                  </span>
                </div>
                <div
                  class="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg"
                >
                  Budi Santoso
                </div>
              </motion.div>

              <!-- Floating cursor -->
              <motion.div
                :initial="{ x: 90, y: 70, opacity: 0 }"
                :animate="{
                  x: [90, 55, 0, 0],
                  y: [70, 30, 0, 0],
                  opacity: [0, 1, 1, 0],
                }"
                :transition="{
                  duration: 3.6,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  times: [0, 0.45, 0.75, 1],
                  ease: 'easeInOut',
                }"
                class="pointer-events-none absolute right-[12%] top-[36%] z-30"
              >
                <svg
                  viewBox="0 0 32 40"
                  class="h-8 w-8 drop-shadow-md"
                  fill="none"
                >
                  <path
                    d="M3 2L3 31L11 23L17 37L23 34L17 20L28 19L3 2Z"
                    fill="#2563EB"
                    stroke="white"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                </svg>
              </motion.div>
            </div>

            <!-- Scalable technology illustration -->
            <div
              v-else-if="feature.visual === 'technology'"
              class="aspect-[3/2] w-full overflow-hidden rounded-2xl p-5 sm:p-8"
              role="img"
              aria-label="Illustration of technologies connected"
            >
              <div class="**:fill-foreground relative mx-auto size-80">
                <div
                  class="bg-card shadow-black/6.5 ring-border absolute inset-0 m-auto flex size-9 items-center rounded-full shadow-sm ring *:m-auto"
                >
                  <img src="/favicon.svg" class="size-3.5" />
                </div>

                <div
                  class="rotate-120 *:-rotate-120 absolute inset-0 flex items-center justify-between gap-12"
                >
                  <div
                    class="border-foreground/10 absolute inset-4 rounded-full border border-dashed"
                  />

                  <div
                    class="bg-muted relative flex size-7 items-center rounded-full border backdrop-blur *:m-auto"
                  >
                    <img
                      src="https://cdn.simpleicons.org/firebase"
                      class="size-3.5"
                      alt="Firebase"
                    />
                  </div>

                  <div
                    class="bg-card shadow-black/6.5 ring-border relative flex size-7 items-center rounded-full shadow-sm ring *:m-auto"
                  >
                    <img
                      src="https://cdn.simpleicons.org/supabase"
                      class="size-3.5"
                      alt="Supabase"
                    />
                  </div>
                </div>

                <div
                  class="absolute inset-12 flex items-center justify-between gap-12"
                >
                  <div
                    class="border-foreground/10 absolute inset-4 rounded-full border border-dashed"
                  />

                  <div
                    class="bg-muted relative flex size-7 items-center rounded-full border backdrop-blur *:m-auto"
                  >
                    <img
                      src="https://cdn.simpleicons.org/vercel"
                      class="size-3.5"
                      alt="Vercel"
                    />
                  </div>

                  <div
                    class="bg-card shadow-black/6.5 ring-border relative flex size-7 items-center rounded-full shadow-sm ring *:m-auto"
                  >
                    <img
                      src="https://img.icons8.com/color/48/slack-new.png"
                      alt="Slack"
                      class="size-3.5"
                    />
                  </div>
                </div>

                <div
                  class="absolute inset-24 flex rotate-45 items-center justify-between gap-12 *:-rotate-45"
                >
                  <div
                    class="border-foreground/10 absolute inset-4 rounded-full border border-dashed"
                  />

                  <div
                    class="bg-card shadow-black/6.5 ring-border relative flex size-7 items-center rounded-full shadow-sm ring *:m-auto"
                  >
                    <img
                      src="https://cdn.simpleicons.org/clerk"
                      class="size-3.5"
                      alt="Clerk"
                    />
                  </div>

                  <div
                    class="bg-muted relative flex size-7 items-center rounded-full border backdrop-blur *:m-auto"
                  >
                    <img
                      src="https://cdn.simpleicons.org/linear"
                      class="size-3.5"
                      alt="Linear"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Tailored solutions illustration -->
            <template v-else-if="feature.visual === 'tailored'">
              <div class="relative w-full max-w-[260px] space-y-2.5">
                <div
                  class="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm"
                >
                  <span
                    class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  >
                    <Target class="size-5" :stroke-width="1.5" />
                  </span>
                  <div class="flex-1 space-y-1.5">
                    <div class="h-2 w-24 rounded-full bg-foreground/15" />
                    <div class="h-1.5 w-36 max-w-full rounded-full bg-muted" />
                  </div>
                  <Check class="size-4 text-primary" />
                </div>
                <div
                  class="ml-7 flex items-center gap-3 rounded-xl border bg-card/90 px-4 py-3 shadow-sm"
                >
                  <span
                    class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  >
                    <Sparkles class="size-5" :stroke-width="1.5" />
                  </span>
                  <div class="flex-1 space-y-1.5">
                    <div class="h-2 w-20 rounded-full bg-foreground/15" />
                    <div class="h-1.5 w-28 rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            </template>

            <!-- End-to-end support illustration -->
            <template v-else>
              <div
                class="relative flex w-full max-w-[300px] items-center justify-between"
              >
                <div
                  class="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-border"
                />
                <div
                  v-for="stage in WHY_CHOOSE_US_STAGES"
                  :key="stage.label"
                  class="relative z-10 flex flex-col items-center gap-3"
                >
                  <span
                    class="flex size-[58px] items-center justify-center rounded-2xl border bg-card text-primary shadow-sm transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <component
                      :is="stage.icon"
                      class="size-6"
                      :stroke-width="1.5"
                    />
                  </span>
                  <span
                    class="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    {{ stage.label }}
                  </span>
                </div>
              </div>
            </template>
          </div>

          <div class="relative z-10 mt-auto pt-7">
            <div class="mb-3 flex items-center justify-between">
              <span
                class="font-mono text-xs tracking-[0.16em] text-muted-foreground/70"
              >
                {{ feature.number }}
              </span>
              <ArrowUpRight
                class="size-4 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </div>
            <h3 class="mb-2 font-heading text-lg font-medium text-foreground">
              {{ feature.title }}
            </h3>
            <p class="text-sm leading-relaxed text-muted-foreground">
              {{ feature.description }}
            </p>
          </div>
        </motion.article>
      </div>
    </div>
  </section>
</template>
