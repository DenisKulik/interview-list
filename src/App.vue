<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/stores'
import AppHeader from '@/components/AppHeader.vue'

const isLoading = ref<boolean>(true)
const userStore = useUserStore()
const { setUserId } = userStore

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      setUserId(user.uid)
    } else {
      setUserId('')
    }
    isLoading.value = false
  })
})
</script>

<template>
  <div v-if="isLoading" class="spinner-container">
    <app-progress-spinner />
  </div>
  <div v-else class="container">
    <app-header />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.spinner-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
