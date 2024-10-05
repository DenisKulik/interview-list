import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type { FetchBaseQueryError, IInterview, SerializedError } from '@/types'
import {
  fetchInterviews,
  deleteInterviewRequest,
  createInterviewRequest,
  fetchInterview,
  saveInterviewRequest
} from '@/api'
import { queryNotificationHandler } from '@/utils'
import type { ToastServiceMethods } from 'primevue/toastservice'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

export const useInterviewStore = defineStore('interview', () => {
  const interviews = ref<IInterview[]>([])
  const interview = ref<IInterview | null>(null)

  const userStore = useUserStore()
  const { userId } = storeToRefs(userStore)

  const router = useRouter()

  const getInterviews = async (toast: ToastServiceMethods): Promise<void> => {
    try {
      interviews.value = await fetchInterviews(userId.value)
    } catch (error: unknown) {
      queryNotificationHandler(error as FetchBaseQueryError | SerializedError, toast)
      interviews.value = []
    }
  }

  const getInterview = async (interviewId: string, toast: ToastServiceMethods): Promise<void> => {
    try {
      interview.value = await fetchInterview(userId.value, interviewId)
    } catch (error: unknown) {
      queryNotificationHandler(error as FetchBaseQueryError | SerializedError, toast)
      interview.value = null
    }
  }

  const saveInterview = async (toast: ToastServiceMethods): Promise<void> => {
    try {
      if (interview.value) {
        await saveInterviewRequest(userId.value, interview.value.id, interview.value)
        interview.value = await fetchInterview(userId.value, interview.value.id)
      }
    } catch (error: unknown) {
      queryNotificationHandler(error as FetchBaseQueryError | SerializedError, toast)
    }
  }

  const addStage = (): void => {
    if (interview.value) {
      if (!interview.value.stages) {
        interview.value.stages = []
      }
      interview.value.stages.push({ name: '', date: null, description: '' })
    }
  }

  const removeStage = (index: number): void => {
    interview.value?.stages?.splice(index, 1)
  }

  const deleteInterview = async (
    interviewId: string,
    toast: ToastServiceMethods
  ): Promise<void> => {
    try {
      await deleteInterviewRequest(userId.value, interviewId)
      interviews.value = interviews.value.filter((item) => {
        return item.id !== interviewId
      })
    } catch (error: unknown) {
      queryNotificationHandler(error as FetchBaseQueryError | SerializedError, toast)
    }
  }

  const createInterview = async (
    payload: IInterview,
    toast: ToastServiceMethods
  ): Promise<void> => {
    try {
      await createInterviewRequest(userId.value, payload)
      router.push({ name: 'List' })
    } catch (error: unknown) {
      queryNotificationHandler(error as FetchBaseQueryError | SerializedError, toast)
    }
  }

  return {
    interviews,
    interview,
    createInterview,
    getInterviews,
    getInterview,
    addStage,
    removeStage,
    deleteInterview,
    saveInterview
  }
})
