import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FetchBaseQueryError, IInterview, SerializedError } from '@/types'
import { fetchInterviews, deleteInterviewRequest, createInterviewRequest } from '@/api'
import { queryNotificationHandler } from '@/utils'
import type { ToastServiceMethods } from 'primevue/toastservice'
import { useRouter } from 'vue-router'

export const useInterviewStore = defineStore('interview', () => {
  const interviews = ref<IInterview[]>([])

  const router = useRouter()

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
    }
  }

  const createInterview = async (
    userId: string,
    payload: IInterview,
    toast: ToastServiceMethods
  ): Promise<void> => {
    try {
      await createInterviewRequest(userId, payload)
      router.push({ name: 'List' })
    } catch (error: unknown) {
      queryNotificationHandler(error as FetchBaseQueryError | SerializedError, toast)
    }
  }

  return { interviews, createInterview, getInterviews, deleteInterview }
})
