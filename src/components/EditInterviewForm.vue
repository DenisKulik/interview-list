<script setup lang="ts">
import type { IInterview } from '@/types'
import { reactive } from 'vue'
import { deepCopy } from '@/utils'

const { interview } = defineProps<{
  interview: IInterview
}>()

const emit = defineEmits<{
  (event: 'saveInterview', interview: IInterview): void
}>()

const localInterview = reactive<IInterview>(deepCopy(interview))

const addStage = (): void => {
  if (!localInterview.stages) {
    localInterview.stages = []
  }
  localInterview.stages.push({ name: '', date: null, description: '' })
}

const removeStage = (index: number): void => {
  localInterview.stages?.splice(index, 1)
}

const saveInterviewHandler = () => {
  emit('saveInterview', localInterview)
}
</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>Собеседование в компанию {{ localInterview.company }}</template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Компания</label>
          <app-input-text v-model="localInterview.company" id="company" class="input mb-3" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Описание вакансии (ссылка)</label>
          <app-input-text
            v-model="localInterview.vacancyLink"
            id="vacancyLink"
            class="input mb-3"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Контакт (имя)</label>
          <app-input-text v-model="localInterview.hrName" id="hrName" class="input mb-3" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <app-input-text
            v-model="localInterview.contactTelegram"
            id="contactTelegram"
            class="input mb-3"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactWhatsApp">WhatsApp HR</label>
          <app-input-text
            v-model="localInterview.contactWhatsApp"
            id="contactWhatsApp"
            class="input mb-3"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <app-input-text
            v-model="localInterview.contactPhone"
            id="contactPhone"
            class="input mb-3"
          />
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <app-input-number
              v-model="localInterview.salaryFrom"
              inputId="salaryFrom"
              placeholder="Зарплатная вилка от"
            />
          </div>
          <div class="flex-auto">
            <app-input-number
              v-model="localInterview.salaryTo"
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
          @click="addStage"
        />
        <template v-if="localInterview.stages">
          <div v-for="(stage, index) in localInterview.stages" :key="index" class="interview-stage">
            <div class="flex flex-column gap-2">
              <label :for="`stage-name-${index}`">Название этапа</label>
              <app-input-text v-model="stage.name" class="input mb-3" :id="`stage-name-${index}`" />
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
            <app-button severity="danger" label="Удалить этап" @click="removeStage(index)" />
          </div>
        </template>

        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <app-radio
              v-model="localInterview.result"
              inputId="interviewResult1"
              name="result"
              value="Refusal"
            />
            <label for="interviewResult1" class="ml-2">Отказ</label>
          </div>
          <div class="flex align-items-center">
            <app-radio
              v-model="localInterview.result"
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
