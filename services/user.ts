const userService = {
    login: (params: any) =>
        useNuxtApp().$api.post("/login", params),

    getUserInfo: () =>
        useNuxtApp().$api.get('/profile')
};

export default userService;