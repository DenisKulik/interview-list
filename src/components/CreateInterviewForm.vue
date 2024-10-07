<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { InterviewFormDataType } from '@/views/PageHome.vue'

const { isLoading } = defineProps<{ isLoading: boolean }>()
const emit = defineEmits<{
  (event: 'addNewInterview', formData: InterviewFormDataType): void
}>()

const formData = reactive<InterviewFormDataType>({
  company: '',
  vacancyLink: '',
  hrName: '',
  contactTelegram: '',
  contactWhatsApp: '',
  contactPhone: ''
})

const disabledSaveButton = computed<boolean>(() => {
  return !(formData.company && formData.vacancyLink && formData.hrName)
})

const addNewInterviewHandler = (): void => {
  emit('addNewInterview', formData)
  resetForm()
}

const resetForm = (): void => {
  formData.company = ''
  formData.vacancyLink = ''
  formData.hrName = ''
  formData.contactTelegram = ''
  formData.contactWhatsApp = ''
  formData.contactPhone = ''
}
</script>

<template>
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
          @click="addNewInterviewHandler"
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
