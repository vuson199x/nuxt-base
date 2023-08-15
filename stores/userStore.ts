import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref(null)

    const setUserInfo = (data: any) => {
        userInfo.value = data
    }

    return { userInfo, setUserInfo }
})