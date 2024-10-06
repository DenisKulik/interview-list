<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useInterviewStore } from '@/stores'

const toast = useToast()
const confirm = useConfirm()

const interviewStore = useInterviewStore()
const { interviews, selectedFilter } = storeToRefs(interviewStore)
const { getInterviews, deleteInterview } = interviewStore

const isLoading = ref<boolean>(false)

onMounted(() => {
  getInterviewsHandler()
})

const selectFilter = (): void => {
  getInterviewsHandler(true)
}

const clearFilter = (): void => {
  selectedFilter.value = ''
  getInterviewsHandler()
}

const getInterviewsHandler = async (isFilter: boolean = false): Promise<void> => {
  isLoading.value = true
  await getInterviews(toast, isFilter)
  isLoading.value = false
}

const confirmRemoveInterview = (interviewId: string): void => {
  confirm.require({
    message: 'Вы действительно хотите удалить собеседование?',
    header: 'Подтвердите действие',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отмена',
    acceptLabel: 'Удалить',
    rejectClass: 'p-button-secondary p-button-text',
    acceptClass: 'p-button-danger',
    accept: async () => {
      isLoading.value = true
      await deleteInterview(interviewId, toast)
      isLoading.value = false
    }
  })
}
</script>

<template>
  <app-toast position="bottom-right" />
  <app-dialog />
  <div v-if="isLoading" class="spinner-container">
    <app-progress-spinner />
  </div>
  <app-message v-else-if="!isLoading && !interviews.length" severity="info"
    >Нет добавленных собеседований
  </app-message>
  <div v-else>
    <h1>Список собеседований</h1>

    <div class="flex align-items-center mb-5">
      <div class="flex align-items-center mr-2">
        <app-radio
          v-model="selectedFilter"
          inputId="interviewResult1"
          name="result"
          value="Refusal"
        />
        <label for="interviewResult1" class="ml-2">Отказ</label>
      </div>
      <div class="flex align-items-center mr-2">
        <app-radio
          v-model="selectedFilter"
          inputId="interviewResult2"
          name="result"
          value="Offer"
        />
        <label for="interviewResult2" class="ml-2">Оффер</label>
      </div>
      <app-button class="mr-2" @click="selectFilter" :disabled="!selectedFilter"
        >Применить</app-button
      >
      <app-button severity="danger" :disabled="!selectedFilter" @click="clearFilter"
        >Сбросить</app-button
      >
    </div>

    <app-datatable :value="interviews">
      <app-column field="company" header="Компания"></app-column>
      <app-column field="hrName" header="Имя HR"></app-column>
      <app-column field="vacancyLink" header="Вакансия">
        <template #body="{ data }">
          <a :href="data.vacancyLink" target="_blank">Ссылка на вакансию</a>
        </template>
      </app-column>
      <app-column header="Контакты">
        <template #body="{ data }">
          <div class="contacts">
            <a
              v-if="data.contactTelegram"
              :href="`https://t.me/${data.contactTelegram}`"
              target="_blank"
              class="contacts__telegram"
            >
              <span class="contacts__icon pi pi-telegram"></span>
            </a>
            <a
              v-if="data.contactWhatsApp"
              :href="`https://wa.me/${data.contactWhatsApp}`"
              target="_blank"
              class="contacts__whatsapp"
            >
              <span class="contacts__icon pi pi-whatsapp"></span>
            </a>
            <a
              v-if="data.contactPhone"
              :href="`https://tel:${data.contactPhone}`"
              target="_blank"
              class="contacts__phone"
            >
              <span class="contacts__icon pi pi-phone"></span>
            </a>
          </div>
        </template>
      </app-column>
      <app-column header="Пройденные этапы">
        <template #body="{ data }">
          <span v-if="!data.stages">Не заполнено</span>
          <div v-else class="interview-stages">
            <app-badge
              v-for="(stage, i) in data.stages"
              :key="i"
              :value="i + 1"
              rounded
              v-tooltip.top="stage.name"
            />
          </div>
        </template>
      </app-column>
      <app-column header="Зарплатная вилка">
        <template #body="{ data }">
          <span v-if="!data.salaryFrom">Не заполнено</span>
          <span v-else>{{ data.salaryFrom }} - {{ data.salaryTo }}</span>
        </template>
      </app-column>
      <app-column header="Результат">
        <template #body="{ data }">
          <span v-if="!data.result">Не заполнено</span>
          <template v-else>
            <app-badge
              :severity="data.result === 'Offer' ? 'success' : 'danger'"
              :value="data.result === 'Offer' ? 'Оффер' : 'Отказ'"
            />
          </template>
        </template>
      </app-column>
      <app-column>
        <template #body="{ data }">
          <div class="flex gap-2">
            <router-link :to="{ name: 'Interview', params: { id: data.id } }">
              <app-button icon="pi pi-pencil" severity="info" />
            </router-link>
            <app-button
              icon="pi pi-trash"
              severity="danger"
              @click="confirmRemoveInterview(data.id)"
            />
          </div>
        </template>
      </app-column>
    </app-datatable>
  </div>
</template>

<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contacts__telegram {
  color: #0088cc;
}
.contacts__whatsapp {
  color: #25d366;
}
.contacts__phone {
  color: #371777;
}
.contacts__icon {
  font-size: 20px;
}
.interview-stages {
  display: flex;
  gap: 5px;
}
.spinner-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
