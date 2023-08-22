
import { useUserStore } from "~/stores/userStore";
import { MAIN_ROUTER } from "~/route";
import userService from "~/services/user";

const PUBLIC_PATHS = [
    MAIN_ROUTER.LOGIN,
    MAIN_ROUTER.SIGNUP
]

export default defineNuxtRouteMiddleware(async (to) => {
    const user = useUserStore()
    const token = useCookie('auth')

    if (token.value) {
        if (PUBLIC_PATHS.includes(to.path)) {
            return navigateTo(MAIN_ROUTER.HOMEPAGE);
        } else if (!user?.userInfo) {
            try {
                const userInfo = await userService.getUserInfo();
                if (!userInfo) {
                    token.value = null
                    return navigateTo(MAIN_ROUTER.LOGIN);
                }
                user.setUserInfo(userInfo)
            } catch (error) { }
        }
    } else if (!PUBLIC_PATHS.includes(to.path)) {
        return navigateTo(MAIN_ROUTER.LOGIN)
    }
})