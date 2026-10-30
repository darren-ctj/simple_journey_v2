<script setup lang="ts">
import { computed } from "vue";
import type { ButtonVariant, ButtonSize } from "@/types/button";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "primary",
    size: "md",
    disabled: false,
    type: "button",
  },
);

defineEmits<{ click: [event: MouseEvent] }>();

const baseClasses =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-primary/30 bg-primary text-primary-foreground shadow-[0_4px_18px_rgba(30,136,255,0.18)] hover:shadow-[0_6px_28px_rgba(30,136,255,0.32)]",
  ghost:
    "border border-transparent bg-transparent text-foreground hover:bg-white/5 hover:text-primary-glow",
  outline:
    "border border-primary-glow/25 bg-surface-glass text-foreground backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-primary-glow/60 hover:bg-primary/5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
  icon: "size-11",
};

const classes = computed(() =>
  [baseClasses, variants[props.variant], sizes[props.size]].join(" "),
);
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
