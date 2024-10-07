<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { IInterview } from '@/types'
import { useInterviewStore } from '@/stores'
import CreateInterviewForm from '@/components/CreateInterviewForm.vue'

export type InterviewFormDataType = Omit<IInterview, 'id' | 'createdAt'>

const toast = useToast()
const interviewStore = useInterviewStore()
const { createInterview } = interviewStore

const isLoading = ref<boolean>(false)

const addNewInterview = async (formData: InterviewFormDataType): Promise<void> => {
  const payload: IInterview = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    ...formData
  }

  isLoading.value = true
  await createInterview(payload, toast)
  isLoading.value = false
}
</script>

<template>
  <app-toast position="bottom-right" />
  <CreateInterviewForm :is-loading="isLoading" @addNewInterview="addNewInterview" />
</template>
