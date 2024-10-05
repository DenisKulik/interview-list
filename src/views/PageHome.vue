<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { IInterview } from '@/types'
import { useInterviewStore } from '@/stores'

type InterviewFormDataType = Omit<IInterview, 'id' | 'createdAt'>

const toast = useToast()
const interviewStore = useInterviewStore()

const formData = reactive<InterviewFormDataType>({
  company: '',
  vacancyLink: '',
  hrName: '',
  contactTelegram: '',
  contactWhatsApp: '',
  contactPhone: ''
})

const isLoading = ref<boolean>(false)
const disabledSaveButton = computed<boolean>(() => {
  return !(formData.company && formData.vacancyLink && formData.hrName)
})

const addNewInterview = async (): Promise<void> => {
  const payload: IInterview = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    ...formData
  }

  isLoading.value = true
  await interviewStore.createInterview(payload, toast)
  isLoading.value = false
}
</script>

<template>
  <app-toast position="bottom-right" />
  <div class="content-interview">
    <app-card>
      <template #title>Новое собеседование</template>
      <template #content>
        <app-input-text class="input mb-3" placeholder="Компания" v-model="formData.company" />
        <app-input-text
          v-model="formData.vacancyLink"
          class="input mb-3"
          placeholder="Описание вакансии (ссылка)"
        />
        <app-input-text v-model="formData.hrName" class="input mb-3" placeholder="Контакт (имя)" />
        <app-input-text
          v-model="formData.contactTelegram"
          class="input mb-3"
          placeholder="Telegram username HR"
        />
        <app-input-text
          v-model="formData.contactWhatsApp"
          class="input mb-3"
          placeholder="WhatsApp телефон HR"
        />
        <app-input-text
          v-model="formData.contactPhone"
          class="input mb-3"
          placeholder="Телефон HR"
        />
        <app-button
          @click="addNewInterview"
          label="Создать собеседование"
          :disabled="disabledSaveButton"
          :loading="isLoading"
        ></app-button>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
}
.content-interview {
  max-width: 600px;
  margin: 0 auto;
}
</style>
