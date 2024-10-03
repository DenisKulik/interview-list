import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FetchBaseQueryError, IInterview, SerializedError } from '@/types'
import { fetchInterviews, deleteInterviewRequest } from '@/api'
import { queryNotificationHandler } from '@/utils'
import type { ToastServiceMethods } from 'primevue/toastservice'

export const useInterviewStore = defineStore('interview', () => {
  const interviews = ref<IInterview[]>([])

  const getInterviews = async (userId: string, toast: ToastServiceMethods): Promise<void> => {
    try {
      interviews.value = await fetchInterviews(userId)
    } catch (error: unknown) {
      queryNotificationHandler(error as FetchBaseQueryError | SerializedError, toast)
      interviews.value = []
    }
  }

  const deleteInterview = async (
    userId: string,
    interviewId: string,
    toast: ToastServiceMethods
  ): Promise<void> => {
    try {
      await deleteInterviewRequest(userId, interviewId)
      interviews.value = interviews.value.filter((item) => {
        return item.id !== interviewId
      })
    } catch (error: unknown) {
      queryNotificationHandler(error as FetchBaseQueryError | SerializedError, toast)
      interviews.value = []
    }
  }

  return { interviews, getInterviews, deleteInterview }
})
