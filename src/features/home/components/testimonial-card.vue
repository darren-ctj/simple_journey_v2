<script setup lang="ts">
import { type Testimonial } from "../types/testimonials";

const props = defineProps<Testimonial>();
</script>

<template>
  <article class="w-full bg-surface-glass p-5 border rounded-lg">
    <p class="mb-5 text-sm text-left leading-relaxed">
      {{ props.quote }}
    </p>

    <div class="flex items-center gap-3">
      <img
        v-if="props.avatar"
        :src="props.avatar"
        :alt="props.name"
        class="size-10 shrink-0 rounded-full object-cover"
      />

      <div
        v-else
        class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-foreground"
      >
        {{ props.name.charAt(0) }}
      </div>

      <div class="min-w-0">
        <div class="flex items-center gap-1.5">
          <p class="truncate text-sm font-semibold text-foreground">
            {{ props.name }}
          </p>

          <svg
            v-if="props.verified"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="size-3.5 shrink-0 text-muted-foreground"
            aria-label="Verified"
          >
            <path
              fill-rule="evenodd"
              d="M10 1.667 12.2 2.8l2.47-.2 1.13 2.2 2.2 1.13-.2 2.47L18.93 10l-1.13 2.2.2 2.47-2.2 1.13-1.13 2.2-2.47-.2L10 18.93l-2.2-1.13-2.47.2-1.13-2.2-2.2-1.13.2-2.47L1.07 10 2.2 7.8 2 5.33l2.2-1.13 1.13-2.2 2.47.2L10 1.667Zm3.04 6.99a.75.75 0 0 0-1.08-1.04l-2.8 2.9-1.12-1.1a.75.75 0 0 0-1.05 1.07l1.66 1.63a.75.75 0 0 0 1.07-.02l3.32-3.44Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <p class="text-xs leading-relaxed text-muted-foreground">
          {{ props.role }} · {{ props.company }}
        </p>
      </div>
    </div>
  </article>
</template>
