<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useInterviewStore } from '@/stores'
import EditInterviewForm from '@/components/EditInterviewForm.vue'

const route = useRoute()
const toast = useToast()

const isLoading = ref<boolean>(true)

const interviewStore = useInterviewStore()
const { interview } = storeToRefs(interviewStore)
const { getInterview, saveInterview } = interviewStore

onMounted(async () => {
  await getInterview(route.params.id as string, toast)
  isLoading.value = false
})

const saveInterviewHandler = async () => {
  isLoading.value = true
  await saveInterview(toast)
  isLoading.value = false
}
</script>

<template>
  <app-toast position="bottom-right" />
  <app-progress-spinner v-if="isLoading" />
  <EditInterviewForm
    v-else-if="interview?.id && !isLoading"
    :interview="interview"
    @saveInterview="saveInterviewHandler"
  />
</template>
