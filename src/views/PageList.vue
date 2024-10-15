<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useInterviewStore } from '@/stores'
import InterviewTableFilter from '@/components/InterviewTableFilter.vue'
import InterviewTable from '@/components/InterviewTable.vue'

const toast = useToast()

const interviewStore = useInterviewStore()
const { interviews } = storeToRefs(interviewStore)
const { getInterviews, deleteInterview } = interviewStore

const isLoading = ref<boolean>(false)
const selectedFilter = ref<string>('')

onMounted(() => getInterviewsHandler())

const selectFilter = (): void => {
  getInterviewsHandler(selectedFilter.value)
}

const clearFilter = (): void => {
  selectedFilter.value = ''
  getInterviewsHandler()
}

const getInterviewsHandler = async (selectedFilter: string = ''): Promise<void> => {
  isLoading.value = true
  await getInterviews(toast, selectedFilter)
  isLoading.value = false
}

const deleteInterviewHandler = async (interviewId: string): Promise<void> => {
  isLoading.value = true
  await deleteInterview(interviewId, toast)
  isLoading.value = false
}
</script>

<template>
  <app-toast position="bottom-right" />
  <app-dialog />
  <div v-if="isLoading" class="spinner-container">
    <app-progress-spinner />
  </div>
  <div v-else>
    <h1>Список собеседований</h1>

    <InterviewTableFilter
      v-model:selectedFilter="selectedFilter"
      @selectFilter="selectFilter"
      @clearFilter="clearFilter"
    />

    <app-message v-if="!interviews.length" severity="info"
      >Нет добавленных собеседований
    </app-message>

    <InterviewTable v-else :interviews="interviews" @deleteInterview="deleteInterviewHandler" />
  </div>
</template>

<style scoped>
.spinner-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
