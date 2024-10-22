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
const isLoading = ref<boolean>(false)
const router = useRouter()
const toast = useToast()

const toggleAuth = (): void => {
  isLogin.value = !isLogin.value
}

const submitForm = ({ email, password }: { email: string; password: string }): void => {
  isLogin.value ? signIn({ email, password }) : signUp({ email, password })
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

const signUp = async ({ email, password }: { email: string; password: string }): Promise<void> => {
  await handleAuth(() => createUserWithEmailAndPassword(getAuth(), email, password))
}

const signIn = async ({ email, password }: { email: string; password: string }): Promise<void> => {
  await handleAuth(() => signInWithEmailAndPassword(getAuth(), email, password))
}
</script>

<template>
  <app-toast position="bottom-right" />
  <LoginForm
    :is-login="isLogin"
    :is-loading="isLoading"
    @toggleAuth="toggleAuth"
    @submitForm="submitForm"
  />
</template>
