<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Button from "../ui/button.vue";
import { useScrolled } from "@/composables/use-scrolled";
import { MENU_ITEMS } from "@/constants/menu.ts";

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
  <div class="fixed left-1/2 top-0 z-[100] w-screen -translate-x-1/2 border-b">
    <nav
      :class="[
        'container-wide flex items-center justify-between',
        'py-2.5 xl:py-5',
        'shadow-[0_4px_30px_#0000001a]',
        'transition-all duration-300',
        isScrolled && [
          'overflow-hidden',
          '!bg-nav-surface/90',
          '!shadow-[0_8px_32px_#0000004d]',
        ],
      ]"
    >
      <img
        fetchpriority="high"
        src="/brand/logo-with-text.webp"
        alt="Simple Journey Indonesia Logo"
        class="h-[50px] w-[88px]"
      />

      <div class="flex items-center gap-1.5 md:gap-4">
        <ul
          class="m-0 hidden list-none items-center justify-center gap-8 p-0 lg:flex xl:gap-16"
        >
          <li v-for="item in MENU_ITEMS" :key="item.to">
            <RouterLink
              to="/"
              class="group relative text-base text-navigation-foreground no-underline transition-colors duration-300 hover:text-primary"
              :class="{
                'font-semibold text-primary': isMenuLinkActive(item.to),
              }"
            >
              {{ item.label }}

              <span
                class="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-[width] duration-300 group-hover:w-full"
                :class="{ 'w-full': isMenuLinkActive(item.to) }"
              />
            </RouterLink>
          </li>

          <li>
            <RouterLink to="/contact" class="block">
              <Button variant="outline" size="lg" :glow="true"
                >Contact Us</Button
              >
            </RouterLink>
          </li>
        </ul>

        <RouterLink to="/contact" class="block lg:hidden">
          <Button variant="outline" size="lg" :glow="true">Contact Us</Button>
        </RouterLink>

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
      </div>
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
        </div>
      </div>
    </Transition>
  </div>
</template>
