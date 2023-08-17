const userService = {
    login: (params: any) =>
        useNuxtApp().$api.post("/login", params),

    getUserInfo: () =>
        useNuxtApp().$api.get('/profile'),
    getUsers: (params: { name: string, page: number, limit: number }) =>
        useNuxtApp().$api.get('/users', params),
    getUserDetail: (id: number) =>
        useNuxtApp().$api.get(`user/${id}`),
    deleteUser: (id: number) =>
        useNuxtApp().$api.delete(`user/${id}`),
    updateUser: (params: any) =>
        useNuxtApp().$api.put(`user/${params.id}`, params),
    createUser: (params: any) =>
        useNuxtApp().$api.post(`user`, params),
};

export default userService;