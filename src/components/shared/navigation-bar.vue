<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Button from "../ui/button.vue";
import { useScrolled } from "@/composables/use-scrolled";
import { MENU_ITEMS } from "@/constants/menu.ts";
import { ArrowRight, Menu, X } from "@lucide/vue";
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
        'overflow-hidden bg-white/05 backdrop-blur-sm border-b border-border/25',
    ]"
  >
    <nav
      :class="[
        'container-wide flex items-center justify-between',
        'py-2.5',
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

      <RouterLink to="/" class="hidden lg:block">
        <Button variant="outline">
          Get Started
          <ArrowRight class="size-4" />
        </Button>
      </RouterLink>

      <button
        type="button"
        aria-label="Toggle menu"
        :aria-expanded="isMobileMenuOpen"
        class="cursor-pointer border-none text-foreground bg-transparent px-1.5 py-0.5 lg:hidden opacity-90"
        @click="handleMenuToggle"
      >
        <Menu />
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
          class="absolute right-[5%] top-[3%] cursor-pointer border-none bg-transparent p-1 opacity-90"
          @click="handleMenuToggle"
        >
          <X />
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
