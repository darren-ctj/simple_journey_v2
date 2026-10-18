<script setup lang="ts">
import NavigationBar from "../components/shared/navigation-bar.vue";
import Footer from "../components/shared/footer.vue";
</script>

<template>
  <div>
    <NavigationBar />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
