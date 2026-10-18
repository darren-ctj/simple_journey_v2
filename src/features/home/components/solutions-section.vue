<script setup lang="ts">
import { motion } from "motion-v";
import StatementHeading from "@/components/shared/statement-heading.vue";
import ProductCard from "@/components/ui/product-card.vue";
</script>

<template>
  <div class="relative">
    <img
      loading="lazy"
      fetchpriority="high"
      src="/features/home/solutions-section-bg.webp"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 z-0 h-full w-full object-cover object-center"
    />

    <div
      class="absolute inset-0 z-[1] bg-[radial-gradient(circle,#050c148c_0%,#050c14e6_70%)]"
    />

    <section
      :class="[
        'container-narrow relative z-[2] text-white',
        'max-md:py-5',
        'py-10',
      ]"
    >
      <div
        :class="[
          'mb-6 flex items-center justify-between',
          'max-md:mb-0 max-md:flex-col max-md:items-center',
          'max-md:justify-start max-md:gap-3',
        ]"
      >
        <div class="max-w-1/2 max-md:max-w-full">
          <StatementHeading
            brand="OUR SOLUTIONS"
            statement="Delivering scalable digital solutions that support operational excellence"
            align="left"
          />
        </div>

        <div
          :class="[
            'relative z-[5] max-w-[23%] leading-loose',
            'max-md:mb-8 max-md:max-w-full',
          ]"
        >
          <motion.p
            :initial="{ opacity: 0 }"
            :whileInView="{ opacity: 1 }"
            :transition="{ duration: 1, delay: 1 }"
            :in-view-options="{ once: true, amount: 0.2 }"
            class="max-md:w-full max-md:text-xs max-md:font-normal max-md:leading-relaxed max-md:tracking-normal"
          >
            Our products are developed to help organizations streamline
            processes, enhance efficiency, and adopt modern digital
            capabilities.
          </motion.p>
        </div>
      </div>

      <motion.div
        class="relative z-[5] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12"
        :initial="{ opacity: 0 }"
        :whileInView="{ opacity: 1 }"
        :transition="{ duration: 1, delay: 1.5 }"
        :in-view-options="{ once: true, amount: 0.2 }"
      >
        <RouterLink to="/products/seamless-passenger">
          <ProductCard
            :badges="['Software']"
            image="/features/home/solutions/seamless-passenger.webp"
            title="Seamless Passenger"
          />
        </RouterLink>

        <RouterLink to="/products/passport-issuance">
          <ProductCard
            :badges="['Software']"
            image="/features/home/solutions/passport-issuance.webp"
            title="Passport Issuance"
          />
        </RouterLink>
      </motion.div>

      <RouterLink
        to="/products"
        class="relative z-[3] mt-6 inline-block text-brand-blue no-underline"
      >
        <motion.span
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :transition="{ duration: 1, delay: 0.7 }"
          :in-view-options="{ once: true, amount: 0.2 }"
        >
          View More →
        </motion.span>
      </RouterLink>
    </section>
  </div>
</template>
