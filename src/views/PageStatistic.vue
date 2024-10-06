<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useInterviewStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import type { IInterview } from '@/types'

const toast = useToast()

const interviewStore = useInterviewStore()
const { interviews } = storeToRefs(interviewStore)
const { getInterviews } = interviewStore

const isLoading = ref<boolean>(false)
const chartData = ref()
const chartOptions = ref()

onMounted(async () => {
  await getInterviewsHandler()
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const getInterviewsHandler = async (isFilter: boolean = false): Promise<void> => {
  isLoading.value = true
  await getInterviews(toast, isFilter)
  isLoading.value = false
}

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  const data: number[] = [0, 0, 0]
  interviews.value.forEach((interview: IInterview) => {
    if (interview.result === 'Offer') {
      data[0]++
    } else if (interview.result === 'Refusal') {
      data[1]++
    } else {
      data[2]++
    }
  })

  return {
    labels: ['Оффер', 'Отказ', 'В процессе'],
    datasets: [
      {
        data,
        backgroundColor: [
          documentStyle.getPropertyValue('--cyan-500'),
          documentStyle.getPropertyValue('--orange-500'),
          documentStyle.getPropertyValue('--gray-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--cyan-400'),
          documentStyle.getPropertyValue('--orange-400'),
          documentStyle.getPropertyValue('--gray-400')
        ]
      }
    ]
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor
        }
      }
    }
  }
}
</script>

<template>
  <app-toast position="bottom-right" />
  <div v-if="isLoading || !chartData || !chartOptions" class="spinner-container">
    <app-progress-spinner />
  </div>
  <div v-else>
    <h1>Статистика</h1>
    <div class="card flex justify-content-center">
      <app-chart
        type="doughnut"
        :data="chartData"
        :options="chartOptions"
        class="w-full md:w-30rem"
      />
    </div>
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
