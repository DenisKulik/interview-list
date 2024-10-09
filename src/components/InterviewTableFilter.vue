<script setup lang="ts">
import { computed } from 'vue'

const { selectedFilter } = defineProps<{ selectedFilter: string }>()

const emit = defineEmits<{
  (event: 'update:selectedFilter', value: string): void
  (event: 'selectFilter'): void
  (event: 'clearFilter'): void
}>()

const proxySelectedFilter = computed({
  get: () => selectedFilter,
  set: (selectedFilter: string) => {
    emit('update:selectedFilter', selectedFilter)
  }
})

const selectFilterHandler = (): void => {
  emit('selectFilter')
}

const clearFilterHandler = (): void => {
  emit('clearFilter')
}
</script>

<template>
  <div class="flex align-items-center mb-5">
    <div class="flex align-items-center mr-2">
      <app-radio
        v-model="proxySelectedFilter"
        inputId="interviewResult1"
        name="result"
        value="Refusal"
      />
      <label for="interviewResult1" class="ml-2">Отказ</label>
    </div>
    <div class="flex align-items-center mr-2">
      <app-radio
        v-model="proxySelectedFilter"
        inputId="interviewResult2"
        name="result"
        value="Offer"
      />
      <label for="interviewResult2" class="ml-2">Оффер</label>
    </div>
    <app-button class="mr-2" @click="selectFilterHandler" :disabled="!proxySelectedFilter">
      Применить
    </app-button>
    <app-button severity="danger" :disabled="!proxySelectedFilter" @click="clearFilterHandler">
      Сбросить
    </app-button>
  </div>
</template>
