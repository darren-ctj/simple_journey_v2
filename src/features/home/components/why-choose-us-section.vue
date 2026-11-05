<script setup lang="ts">
import { motion } from "motion-v";
import { ArrowUpRight } from "@lucide/vue";
import { WHY_CHOOSE_US_FEATURES } from "../constants/why-choose-us";
import Badge from "@/components/ui/badge.vue";
import LayerStack from "@/components/ui/layer-stack.vue";
import Journey from "@/components/ui/journey.vue";
</script>

<template>
  <section class="relative z-[1] w-screen overflow-hidden">
    <div
      class="relative container-wide flex flex-col items-start pt-28 pb-12 text-left lg:pt-32 lg:pb-20"
    >
      <!-- <div
        class="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-200 w-700 rounded-full opacity-20 blur-[100px]"
        style="background: radial-gradient(circle, #1e88ff 0%, transparent 30%)"
      /> -->

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

      <div class="relative grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        <!-- Top center -->
        <div
          class="pointer-events-none absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full opacity-20 blur-[100px]"
          style="
            background: radial-gradient(circle, #1e88ff 0%, transparent 65%);
          "
        />

        <!-- Center left -->
        <div
          class="pointer-events-none absolute top-1/2 -left-40 h-125 w-125 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
          style="
            background: radial-gradient(circle, #1e88ff 0%, transparent 65%);
          "
        />

        <!-- Center right -->
        <div
          class="pointer-events-none absolute top-1/2 -right-40 h-125 w-125 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
          style="
            background: radial-gradient(circle, #1e88ff 0%, transparent 65%);
          "
        />

        <!-- Bottom center -->
        <div
          class="pointer-events-none absolute -bottom-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full opacity-20 blur-[100px]"
          style="
            background: radial-gradient(circle, #1e88ff 0%, transparent 65%);
          "
        />

        <!-- Content -->
        <motion.article
          v-for="(feature, index) in WHY_CHOOSE_US_FEATURES"
          :key="feature.number"
          :initial="{ opacity: 0, y: 16, filter: 'blur(8px)' }"
          :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.55, delay: 0.12 * index }"
          :viewport="{ once: true }"
          class="group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border bg-surface-glass sm:min-h-[360px]"
        >
          <div class="aspect-[3/2]">
            <!-- Experienced & Proven Team Illustration -->
            <div
              v-if="feature.visual === 'team'"
              class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-t-2xl"
              role="img"
              aria-label="Illustration of teammates connecting and inviting a new team member"
            >
              <!-- Background decoration -->
              <div
                class="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              />

              <!-- Main -->
              <div class="relative grid h-full w-full grid-cols-3 items-center">
                <!-- Dashed connection lines -->
                <div
                  class="pointer-events-none absolute z-0 left-[16.667%] top-1/2 -translate-y-[calc(50%+16px)] w-[58.5%] border-t-2 border-dashed border-primary"
                />

                <!-- Existing teammate 1 -->
                <motion.div
                  :initial="{ opacity: 0, y: 12 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.6 }"
                  class="relative z-10 flex flex-col items-center gap-3"
                >
                  <div
                    class="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-orange-100 shadow-lg dark:border-slate-800 dark:bg-orange-950 sm:h-24 sm:w-24"
                  >
                    <img
                      src="https://i.pravatar.cc/150?img=11"
                      alt="Ahmad Rizky"
                      class="h-full w-full rounded-full object-cover"
                    />

                    <span
                      class="absolute bottom-0 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-emerald-500 dark:border-slate-800"
                    />
                  </div>

                  <Badge>Ahmad Rizky</Badge>
                </motion.div>

                <!-- Existing teammate 2 -->
                <motion.div
                  :initial="{ opacity: 0, y: 12 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.6, delay: 0.15 }"
                  class="relative z-10 flex flex-col items-center gap-3"
                >
                  <div
                    class="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-indigo-100 shadow-lg dark:border-slate-800 dark:bg-indigo-950 sm:h-24 sm:w-24"
                  >
                    <img
                      src="https://i.pravatar.cc/150?img=5"
                      alt="Sari Dewi"
                      class="h-full w-full rounded-full object-cover"
                    />

                    <span
                      class="absolute bottom-0 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-emerald-500 dark:border-slate-800"
                    />
                  </div>

                  <Badge> Sari Dewi </Badge>
                </motion.div>

                <!-- Existing teammate 3 -->
                <div class="relative z-10 flex flex-col items-center gap-3">
                  <!-- Invite slot -->
                  <div
                    class="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-primary bg-slate-900/70 shadow-sm sm:h-24 sm:w-24"
                  >
                    <span
                      class="flex h-10 w-10 items-center justify-center rounded-full"
                    >
                      <icon name="plus" size="xl" />
                    </span>
                  </div>

                  <div
                    class="rounded-full border border-dashed border-primary/10 bg-primary/3 text-primary px-3 py-1 text-xs font-semibold"
                  >
                    Budi Santoso
                  </div>

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
                    class="absolute inset-0 z-20 flex flex-col items-center gap-3"
                  >
                    <!-- Avatar -->
                    <div
                      class="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-emerald-100 shadow-xl ring-4 ring-blue-400/20 dark:border-slate-800 dark:bg-emerald-950 sm:h-24 sm:w-24"
                    >
                      <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt="Budi Santoso"
                        class="h-full w-full rounded-full object-cover"
                      />

                      <span
                        class="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-emerald-500 text-white dark:border-slate-800"
                      >
                        <icon name="check" size="xs" />
                      </span>
                    </div>

                    <!-- Name -->
                    <div
                      class="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-lg"
                    >
                      Budi Santoso
                    </div>

                    <!-- Floating cursor -->
                    <div
                      class="pointer-events-none absolute right-11 bottom-8 z-30"
                    >
                      <svg
                        viewBox="0 0 32 40"
                        class="h-8 w-8 drop-shadow-md"
                        fill="none"
                      >
                        <path
                          d="M3 2L3 31L11 23L17 37L23 34L17 20L28 19L3 2Z"
                          fill="#1E88FF"
                          stroke="white"
                          stroke-width="2"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <!-- Reliable & Scalable Technology Illustration -->
            <div
              v-else-if="feature.visual === 'technology'"
              class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-t-2xl"
              role="img"
              aria-label="Illustration of technologies connected"
            >
              <!-- Background decoration -->
              <div
                class="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              />

              <!-- Main -->
              <div class="**:fill-foreground relative mx-auto size-80">
                <div
                  class="bg-surface-glass shadow-black/6.5 ring-border absolute inset-0 m-auto flex size-9 items-center rounded-full shadow-sm ring *:m-auto"
                >
                  <img src="/favicon.svg" class="size-3.5" />
                </div>

                <div
                  class="rotate-120 *:-rotate-120 absolute inset-0 flex items-center justify-between gap-12"
                >
                  <div
                    class="border-foreground/10 absolute inset-1.5 rounded-full border border-dashed"
                  />

                  <div
                    class="bg-card relative flex size-7 items-center rounded-full border backdrop-blur *:m-auto -translate-x-1.5"
                  >
                    <img
                      src="https://cdn.simpleicons.org/firebase"
                      class="size-3.5"
                      alt="Firebase"
                    />
                  </div>

                  <div
                    class="bg-card shadow-black/6.5 ring-border relative flex size-7 items-center rounded-full shadow-sm ring *:m-auto translate-x-1.5"
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
                    class="border-foreground/10 absolute inset-1.5 rounded-full border border-dashed"
                  />

                  <div
                    class="bg-card relative flex size-7 items-center rounded-full border backdrop-blur *:m-auto -translate-x-1.5"
                  >
                    <img
                      src="https://cdn.simpleicons.org/vercel"
                      class="size-3.5"
                      alt="Vercel"
                    />
                  </div>

                  <div
                    class="bg-card shadow-black/6.5 ring-border relative flex size-7 items-center rounded-full shadow-sm ring *:m-auto translate-x-1.5"
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
                    class="border-foreground/10 absolute inset-1.5 rounded-full border border-dashed"
                  />

                  <div
                    class="bg-card shadow-black/6.5 ring-border relative flex size-7 items-center rounded-full shadow-sm ring *:m-auto -translate-x-1.5"
                  >
                    <img
                      src="https://cdn.simpleicons.org/clerk"
                      class="size-3.5"
                      alt="Clerk"
                    />
                  </div>

                  <div
                    class="bg-card relative flex size-7 items-center rounded-full border backdrop-blur *:m-auto translate-x-1.5"
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

            <!-- Tailored to Your Business Illustration -->
            <div
              v-else-if="feature.visual === 'tailored'"
              class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-t-2xl"
              role="img"
              aria-label="Illustration of tailored according to business"
            >
              <!-- Background decoration -->
              <div
                class="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              />

              <!-- Main -->
              <LayerStack />
            </div>

            <!-- Integrated End-to-End Support Illustration -->
            <div
              v-else
              class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-t-2xl"
            >
              <!-- Background decoration -->
              <div
                class="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              />

              <!-- Main -->
              <Journey />
            </div>
          </div>

          <div class="relative z-10 mt-auto p-5 md:p-7">
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
