import type { ToastServiceMethods } from 'primevue/toastservice'

type toastSeverityType = 'error' | 'success' | 'warn' | 'info' | 'secondary' | 'contrast'

export const showToast = (
  message: string,
  toast: ToastServiceMethods,
  severity: toastSeverityType = 'error'
) => {
  toast.add({
    severity,
    summary: severity === 'error' ? 'Ошибка' : 'Уведомление',
    detail: message,
    life: 3000
  })
}
