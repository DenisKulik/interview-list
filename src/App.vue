<script setup lang="ts">
import { AppHeader } from '@/components'
</script>

<template>
  <div class="container">
    <app-header />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
}
</style>
