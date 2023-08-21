
import { useUserStore } from "~/stores/userStore";
import { MAIN_ROUTER } from "~/route";
import userService from "~/services/user";
import { useAuthStore } from "~/stores/authStore";

const PUBLIC_PATHS = [
    MAIN_ROUTER.LOGIN,
    MAIN_ROUTER.SIGNUP
]

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUserStore()
    const auth = useAuthStore()

    if (auth?.session) {
        try {
            if (!user?.userInfo) {
                const userInfo = await userService.getUserInfo();
                user.setUserInfo(userInfo)
            }
            if (PUBLIC_PATHS.includes(to.path)) {
                return navigateTo(MAIN_ROUTER.HOMEPAGE);
            }
        } catch (error) {
            auth.setSession(null)
            return navigateTo(MAIN_ROUTER.LOGIN);
        }
    } else if (!PUBLIC_PATHS.includes(from.path)) {
        return
    } else if (!PUBLIC_PATHS.includes(to.path)) {
        return navigateTo(MAIN_ROUTER.LOGIN);
    }
})