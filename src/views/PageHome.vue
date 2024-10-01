<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { setDoc, doc } from 'firebase/firestore'
import { useToast } from 'primevue/usetoast'
import type { IInterview } from '@/types'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { db } from '@/main'

type InterviewFormDataType = Omit<IInterview, 'id' | 'createdAt'>

const toast = useToast()

const userStore = useUserStore()
const { userId } = storeToRefs(userStore)
const router = useRouter()

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
  try {
    isLoading.value = true
    const payload: IInterview = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...formData
    }

    if (userId.value) {
      await setDoc(doc(db, `users/${userId.value}/interviews`, payload.id), payload)
      router.push({ name: 'List' })
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error.message,
        life: 3000
      })
    }
  } finally {
    isLoading.value = false
  }
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
