import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IInterview } from '@/types'

export const useInterviewStore = defineStore('interview', () => {
  const interviews = ref<IInterview[]>([])

  const setInterviews = (data: IInterview[]): void => {
    interviews.value = data
  }

  const deleteInterview = (id: string): void => {
    interviews.value = interviews.value.filter((item) => item.id !== id)
  }

  return { interviews, setInterviews, deleteInterview }
})
