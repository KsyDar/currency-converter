<template>
  <LayoutHeader />

  <main class="main">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
</script>

<style scoped lang="scss">
.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
