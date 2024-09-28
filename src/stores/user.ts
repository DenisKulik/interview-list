import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref<string>('')

  const setUserId = (id: string): void => {
    userId.value = id
  }

  return { userId, setUserId }
})
