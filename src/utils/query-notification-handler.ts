import { showToast } from '@/utils/showToast'
import type { FetchBaseQueryError, SerializedError } from '@/types'
import type { ToastServiceMethods } from 'primevue/toastservice'

export const queryNotificationHandler = (
  response: FetchBaseQueryError | SerializedError | undefined,
  toast: ToastServiceMethods
): void => {
  if (!response) {
    showToast('Что-то пошло не так', toast)
    return
  }

  // FetchBaseQueryError handler
  if ('status' in response) {
    const errorMessage = response.data?.message || response.error || 'Что-то пошло не так'
    showToast(errorMessage, toast)
    return
  }

  // SerializedError handler
  if ('message' in response) {
    showToast(response.message || 'Что-то пошло не так', toast)
    return
  }

  // unknown error type
  showToast('Неизвестная ошибка', toast)
}
