<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import type { UserCredential } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { queryNotificationHandler } from '@/utils'
import type { FetchBaseQueryError, SerializedError } from '@/types'
import LoginForm from '@/components/LoginForm.vue'

const isLogin = ref<boolean>(true)
const email = ref<string>('')
const password = ref<string>('')
const isLoading = ref<boolean>(false)
const router = useRouter()
const toast = useToast()

const toggleAuth = (): void => {
  isLogin.value = !isLogin.value
}

const submitForm = (): void => {
  isLogin.value ? signIn() : signUp()
}

const handleAuth = async (authMethod: () => Promise<UserCredential>): Promise<void> => {
  isLoading.value = true
  try {
    await authMethod()
    router.push({ name: 'Home' })
  } catch (error: unknown) {
    queryNotificationHandler(error as FetchBaseQueryError | SerializedError, toast)
  } finally {
    isLoading.value = false
  }
}

const signUp = async (): Promise<void> => {
  await handleAuth(() => createUserWithEmailAndPassword(getAuth(), email.value, password.value))
}

const signIn = async (): Promise<void> => {
  await handleAuth(() => signInWithEmailAndPassword(getAuth(), email.value, password.value))
}
</script>

<template>
  <app-toast position="bottom-right" />
  <LoginForm
    v-model:email="email"
    v-model:password="password"
    :is-login="isLogin"
    :is-loading="isLoading"
    @toggleAuth="toggleAuth"
    @submitForm="submitForm"
  />
</template>
