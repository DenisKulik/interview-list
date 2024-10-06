<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useInterviewStore } from '@/stores'

const route = useRoute()
const toast = useToast()

const isLoading = ref<boolean>(true)

const interviewStore = useInterviewStore()
const { interview } = storeToRefs(interviewStore)
const { getInterview, saveInterview, addStage, removeStage } = interviewStore

onMounted(async () => {
  await getInterview(route.params.id as string, toast)
  isLoading.value = false
})

const addStageHandler = () => {
  addStage()
}

const saveInterviewHandler = async () => {
  isLoading.value = true
  await saveInterview(toast)
  isLoading.value = false
}

const removeStageHandler = (index: number) => {
  removeStage(index)
}
</script>

<template>
  <app-toast position="bottom-right" />
  <app-progress-spinner v-if="isLoading" />
  <div class="content-interview" v-else-if="interview?.id && !isLoading">
    <app-card>
      <template #title>Собеседование в компанию {{ interview.company }}</template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Компания</label>
          <app-input-text v-model="interview.company" id="company" class="input mb-3" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Описание вакансии (ссылка)</label>
          <app-input-text v-model="interview.vacancyLink" id="vacancyLink" class="input mb-3" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Контакт (имя)</label>
          <app-input-text v-model="interview.hrName" id="hrName" class="input mb-3" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <app-input-text
            v-model="interview.contactTelegram"
            id="contactTelegram"
            class="input mb-3"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactWhatsApp">WhatsApp HR</label>
          <app-input-text
            v-model="interview.contactWhatsApp"
            id="contactWhatsApp"
            class="input mb-3"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <app-input-text v-model="interview.contactPhone" id="contactPhone" class="input mb-3" />
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <app-input-number
              v-model="interview.salaryFrom"
              inputId="salaryFrom"
              placeholder="Зарплатная вилка от"
            />
          </div>
          <div class="flex-auto">
            <app-input-number
              v-model="interview.salaryTo"
              inputId="salaryTo"
              placeholder="Зарплатная вилка до"
            />
          </div>
        </div>

        <app-button
          label="Добавить этап"
          severity="info"
          icon="pi pi-plus"
          class="mb-3"
          @click="addStageHandler"
        />
        <template v-if="interview.stages">
          <div v-for="(stage, index) in interview.stages" :key="index" class="interview-stage">
            <div class="flex flex-column gap-2">
              <label :for="`stage-name-${index}`">Название этапа</label>
              <app-input-text class="input mb-3" :id="`stage-name-${index}`" v-model="stage.name" />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-date-${index}`">Дата прохождения этапа</label>
              <app-calendar
                v-model="stage.date"
                class="input mb-3"
                :id="`stage-date-${index}`"
                dateFormat="dd.mm.yy"
              />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-description-${index}`">Комментарий</label>
              <app-textarea
                v-model="stage.description"
                :id="`stage-description-${index}`"
                class="input mb-3"
                rows="5"
              />
            </div>
            <app-button severity="danger" label="Удалить этап" @click="removeStageHandler(index)" />
          </div>
        </template>

        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <app-radio
              v-model="interview.result"
              inputId="interviewResult1"
              name="result"
              value="Refusal"
            />
            <label for="interviewResult1" class="ml-2">Отказ</label>
          </div>
          <div class="flex align-items-center">
            <app-radio
              v-model="interview.result"
              inputId="interviewResult2"
              name="result"
              value="Offer"
            />
            <label for="interviewResult2" class="ml-2">Оффер</label>
          </div>
        </div>
        <app-button label="Сохранить" icon="pi pi-save" @click="saveInterviewHandler" />
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
