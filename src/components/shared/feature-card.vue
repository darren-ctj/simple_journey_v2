<script setup lang="ts">
defineProps<{
  number: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <article
    :class="[
      'feature-card box-content max-w-[420px] rounded-[14px] border border-white/80',
      'bg-white/[0.01] p-6 text-white shadow-[0_10px_30px_#00000059] backdrop-blur-[6.8px]',
      'max-md:max-w-[80vw]',
    ]"
  >
    <header class="feature-header flex items-center gap-4">
      <div
        class="feature-number flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-white/80 bg-white/10 text-base font-semibold shadow-[0_4px_30px_#0000001a] backdrop-blur-[17.5px]"
      >
        {{ number }}
      </div>

      <h3 class="feature-title m-0 text-lg font-semibold">
        {{ title }}
      </h3>
    </header>

    <div class="feature-divider my-4 h-px bg-white/15" />

    <p class="feature-description m-0 text-sm leading-relaxed text-white/75">
      {{ description }}
    </p>
  </article>
</template>
