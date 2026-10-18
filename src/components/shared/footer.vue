<script setup lang="ts">
import { SOCIAL_LINKS } from "@/constants/link";
</script>

<template>
  <div class="bg-footer">
    <footer :class="['container-wide', 'pt-10 pb-6', 'max-md:py-5']">
      <div class="flex items-center gap-2.5 text-xl font-semibold">
        <img
          loading="lazy"
          fetchpriority="high"
          src="/brand/logo.svg"
          alt="Simple Journey"
          class="size-20 max-md:size-[50px]"
        />

        <span
          :class="[
            'text-5xl text-footer-accent',
            'max-md:text-4xl max-md:font-semibold',
            'max-md:leading-relaxed max-md:tracking-tight',
          ]"
        >
          Simple Journey
        </span>
      </div>

      <p
        :class="[
          'mt-7 w-full max-w-lg',
          'text-base leading-relaxed text-white opacity-75',
          'max-md:text-sm max-md:font-normal',
          'max-md:leading-relaxed max-md:tracking-normal',
        ]"
      >
        Ruko Cendana, Jl. Benteng Betawi No.37, RT.004/RW.015, Tanah Tinggi,
        Kec. Tangerang, Kota Tangerang, Banten 15119
      </p>

      <div class="my-12 mb-4 h-px bg-divider" />

      <div
        :class="[
          'flex items-center justify-between',
          'max-md:flex-col max-md:gap-3 max-md:text-center',
        ]"
      >
        <span class="text-sm text-white">
          © 2026 PT Simple Journey. All Rights Reserved. |
          <RouterLink
            to="/privacy-policy"
            class="ml-2 text-footer-link no-underline transition-colors duration-200 hover:text-primary"
          >
            Privacy Policy
          </RouterLink>
        </span>

        <div class="flex gap-4">
          <a
            v-for="social in SOCIAL_LINKS"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              fetchpriority="low"
              :src="social.icon"
              :alt="social.name"
              class="size-4 opacity-85 brightness-0 invert transition-opacity duration-200 hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
