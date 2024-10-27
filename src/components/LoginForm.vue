<script setup lang="ts">
import { computed } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { isLogin, isLoading } = defineProps<{
  isLogin: boolean
  isLoading: boolean
}>()

const emit = defineEmits(['toggleAuth', 'submitForm', 'update:email'])

const validationSchema = yup.object({
  email: yup.string().email('Введите корректный email').required('Email обязателен'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен')
})

const { handleSubmit, defineField, errors, meta } = useForm({
  validationSchema
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

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
const submitFormHandler = handleSubmit(() => {
  emit('submitForm', { email: email.value, password: password.value })
})
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
        <div class="relative mb-3">
          <label for="email1" class="block text-900 font-medium mb-2">Email</label>
          <app-input-text
            v-model="email"
            id="email1"
            type="email"
            name="email"
            class="w-full mb-1"
            v-bind="emailAttrs"
          />
          <span class="absolute top-100 left-0 inline-block text-red-300 text-xs">
            {{ errors.email }}
          </span>
        </div>

        <div class="relative mb-5">
          <label for="password1" class="block text-900 font-medium mb-2">Пароль</label>
          <app-input-text
            v-model="password"
            id="password1"
            type="password"
            class="w-full mb-1"
            v-bind="passwordAttrs"
          />
          <span class="absolute top-100 left-0 inline-block text-red-300 text-xs">
            {{ errors.password }}
          </span>
        </div>

        <app-button
          :label="submitButtonText"
          type="submit"
          icon="pi pi-user"
          :loading="isLoading"
          :disabled="!meta.touched"
          class="w-full"
        ></app-button>
      </form>
    </div>
  </div>
</template>
