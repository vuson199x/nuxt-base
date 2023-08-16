const userService = {
    login: (params: any) =>
        useNuxtApp().$api.post("/login", params),

    getUserInfo: () =>
        useNuxtApp().$api.get('/profile'),
    getUsers: (params: { name: string, page: number, limit: number }) =>
        useNuxtApp().$api.get('/users', params),
};

export default userService;