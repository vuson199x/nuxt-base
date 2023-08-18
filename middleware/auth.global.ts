
import { useUserStore } from "~/stores/userStore";
import { MAIN_ROUTER } from "~/route";
import userService from "~/services/user";
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUserStore()
    const auth = useAuthStore()
    if (auth?.session) {
        try {
            const userInfo = await userService.getUserInfo();
            user.setUserInfo(userInfo)
            if (to.path === MAIN_ROUTER.LOGIN) {
                return navigateTo(MAIN_ROUTER.HOMEPAGE);
            }
        } catch (error) {
            auth.setSession(null)
            return navigateTo(MAIN_ROUTER.LOGIN);
        }
    }
    // else if (to.path !== MAIN_ROUTER.LOGIN) {
    //     return navigateTo(MAIN_ROUTER.LOGIN);
    // }
})