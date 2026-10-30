<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Button from "../ui/button.vue";
import { useScrolled } from "@/composables/use-scrolled";
import { MENU_ITEMS } from "@/constants/menu.ts";
import { ArrowRight } from "@lucide/vue";
import ShinyWrapper from "../ui/shiny-wrapper.vue";

const route = useRoute();
const { isScrolled } = useScrolled();

const isMobileMenuOpen = ref(false);

function isMenuLinkActive(to: string): boolean {
  return to === "/" ? route.path === "/" : route.path.startsWith(to);
}

function handleMenuToggle() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function handleNavigationClick() {
  isMobileMenuOpen.value = false;
}
</script>

<template>
  <div
    :class="[
      'fixed left-1/2 top-0 z-[100] w-screen -translate-x-1/2',
      isScrolled &&
        'overflow-hidden bg-glass-surface border-b border-border/25',
    ]"
  >
    <nav
      :class="[
        'container-wide flex items-center justify-between',
        'py-2.5 xl:py-5',
        'transition-all duration-300',
      ]"
    >
      <img
        fetchpriority="high"
        src="/brand/logo-with-text.webp"
        alt="Simple Journey Indonesia Logo"
        class="h-[50px] w-[88px]"
      />

      <ul class="hidden lg:flex items-center justify-center list-none gap-4">
        <li v-for="item in MENU_ITEMS" :key="item.to">
          <RouterLink
            to="/"
            class="group relative text-sm text-navigation-foreground no-underline transition-colors duration-300 hover:text-primary px-5 py-1.5 rounded-xl"
            :class="{
              'font-semibold text-primary bg-primary/10': isMenuLinkActive(
                item.to,
              ),
            }"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- <ShinyWrapper class="hidden lg:block rounded-full"> -->
      <RouterLink to="/" class="hidden lg:block">
        <Button variant="outline">
          Get Started
          <ArrowRight class="size-4" />
        </Button>
      </RouterLink>
      <!-- </ShinyWrapper> -->

      <button
        type="button"
        aria-label="Toggle menu"
        :aria-expanded="isMobileMenuOpen"
        class="flex cursor-pointer flex-col gap-1 border-none bg-transparent px-1.5 py-0.5 lg:hidden"
        @click="handleMenuToggle"
      >
        <span
          class="h-px w-5 bg-white transition-all duration-300"
          :class="isMobileMenuOpen ? 'translate-y-[5px] rotate-45' : ''"
        />
        <span
          class="h-px w-5 bg-white transition-all duration-300"
          :class="{ 'opacity-0': isMobileMenuOpen }"
        />
        <span
          class="h-px w-5 bg-white transition-all duration-300"
          :class="{ 'opacity-0': isMobileMenuOpen }"
        />
        <span
          class="h-px w-5 bg-white transition-all duration-300"
          :class="isMobileMenuOpen ? '-translate-y-[5px] -rotate-45' : ''"
        />
      </button>
    </nav>

    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-500 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-[9998] flex h-dvh w-screen justify-center bg-nav-surface/80 pt-20 backdrop-blur-md lg:hidden"
      >
        <button
          type="button"
          aria-label="Close menu"
          class="absolute right-[5%] top-[3%] flex cursor-pointer flex-col gap-1 border-none bg-transparent p-1"
          @click="handleMenuToggle"
        >
          <span
            class="h-px w-5 translate-x-1.5 translate-y-[9px] rotate-45 bg-white"
          />
          <span class="h-px w-5 opacity-0" />
          <span class="h-px w-5 opacity-0" />
          <span
            class="h-px w-5 translate-x-1.5 -translate-y-1.5 -rotate-45 bg-white"
          />
        </button>

        <div class="flex flex-col items-center gap-9">
          <RouterLink
            v-for="item in MENU_ITEMS"
            :key="`mobile-${item.to}`"
            :to="item.to"
            :class="[
              'rounded-lg px-3 py-2 text-base no-underline transition-all duration-300 hover:bg-primary/10',
              isMenuLinkActive(item.to)
                ? 'font-semibold text-primary'
                : 'text-white',
            ]"
            @click="handleNavigationClick"
          >
            {{ item.label }}
          </RouterLink>

          <ShinyWrapper class="rounded-full">
            <Button variant="outline">
              Get Started
              <ArrowRight class="size-4" />
            </Button>
          </ShinyWrapper>
        </div>
      </div>
    </Transition>
  </div>
</template>
