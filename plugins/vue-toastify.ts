// plugins/vue-toastify.ts
import { defineNuxtPlugin } from '#imports'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      myToast: { // Utilise un autre nom comme `myToast`
        success: (message: string) => {
          toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          } as any)
        },
        error: (message: string) => {
          toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          } as any)
        },
        info: (message: string) => {
          toast.info(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          } as any)
        },
      },
    },
  }
})
