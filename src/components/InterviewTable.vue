<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'
import type { IInterview } from '@/types'

const { interviews } = defineProps<{
  interviews: IInterview[]
}>()

const emit = defineEmits<{
  (event: 'deleteInterview', interviewId: string): void
}>()

const confirm = useConfirm()

const confirmRemoveInterview = (interviewId: string): void => {
  confirm.require({
    message: 'Вы действительно хотите удалить собеседование?',
    header: 'Подтвердите действие',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отмена',
    acceptLabel: 'Удалить',
    rejectClass: 'p-button-secondary p-button-text',
    acceptClass: 'p-button-danger',
    accept: () => {
      emit('deleteInterview', interviewId)
    }
  })
}
</script>

<template>
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
            v-for="({ name }, i) in data.stages"
            :key="i"
            :value="i + 1"
            rounded
            v-tooltip.top="name"
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
</style>
