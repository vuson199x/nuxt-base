import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const session = ref(null)

  const setSession = (data: any) => {
    session.value = data
  }

  return { session, setSession }
},
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
)