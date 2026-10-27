<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant = "primary" | "ghost" | "outline";

type ButtonSize = "sm" | "md" | "lg" | "icon";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    glow?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    glow: false,
    type: "button",
  },
);

defineEmits<{ click: [event: MouseEvent] }>();

const baseClasses =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-primary/30 bg-gradient-primary text-primary-foreground shadow-[0_4px_18px_rgba(30,136,255,0.18)] hover:shadow-[0_6px_28px_rgba(30,136,255,0.32)]",
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
  [
    baseClasses,
    variants[props.variant],
    sizes[props.size],
    props.glow && props.variant === "outline"
      ? "shadow-[0_0_24px_rgba(30,136,255,0.18)] hover:shadow-[0_0_32px_rgba(30,136,255,0.3)]"
      : "",
  ].join(" "),
);
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span
      v-if="variant === 'outline'"
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/2 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent motion-safe:group-hover:animate-shine motion-reduce:hidden"
    />

    <span
      v-if="glow && variant === 'outline'"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 rounded-full bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />

    <svg
      v-if="loading"
      aria-hidden="true"
      class="relative z-10 size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />

      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>

    <span class="relative z-10">
      <slot />
    </span>
  </button>
</template>
