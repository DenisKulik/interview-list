<script setup lang="ts">
import { computed } from 'vue'

const { email, password, isLogin, isLoading } = defineProps<{
  email: string
  password: string
  isLogin: boolean
  isLoading: boolean
}>()

const emit = defineEmits(['update:email', 'update:password', 'toggleAuth', 'submitForm'])

const proxyEmail = computed({
  get: () => email,
  set: (value: string) => {
    emit('update:email', value)
  }
})

const proxyPassword = computed({
  get: () => password,
  set: (value: string) => {
    emit('update:password', value)
  }
})

const subtitleText = computed<string>(() => {
  return isLogin ? 'Аккаунта еще нет?' : 'Уже есть аккаунт?'
})

const linkAccountText = computed<string>(() => {
  return isLogin ? 'Создайте сейчас' : 'Войдите в него'
})

const submitButtonText = computed<string>(() => {
  return isLogin ? 'Войти' : 'Зарегестрироваться'
})

const toggleAuthHandler = () => {
  emit('toggleAuth')
}
const submitFormHandler = () => {
  emit('submitForm')
}
</script>

<template>
  <div class="flex justify-content-center p-2">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Приветствую!</div>
        <span class="text-600 font-medium line-height-3">{{ subtitleText }}</span>
        <a
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          @click="toggleAuthHandler"
        >
          {{ linkAccountText }}
        </a>
      </div>

      <form @submit.prevent="submitFormHandler">
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <app-input-text v-model="proxyEmail" id="email1" type="email" class="w-full mb-3" />

        <label for="password1" class="block text-900 font-medium mb-2">Пароль</label>
        <app-input-text
          v-model="proxyPassword"
          id="password1"
          type="password"
          class="w-full mb-3"
        />

        <app-button
          :label="submitButtonText"
          type="submit"
          icon="pi pi-user"
          :loading="isLoading"
          class="w-full"
        ></app-button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
