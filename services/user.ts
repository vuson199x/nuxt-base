const userService = {
    getUserInfo: () =>
        useNuxtApp().$api.get('/profile'),
    getUsers: (params: { name: string, page: number, limit: number }) =>
        useNuxtApp().$api.get('/users', params),
    getUserDetail: (id: number) =>
        useNuxtApp().$api.get(`/user/${id}`),
    updateUser: (params: any) =>
        useNuxtApp().$api.put(`/user/${params.id}`, params),
    changePwd: (params: any) =>
        useNuxtApp().$api.put(`/change-password`, params),
};

export default userService;