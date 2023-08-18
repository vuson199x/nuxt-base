const authService = {
    login: (params: any) =>
        useNuxtApp().$api.post("/login", params),
    logout: () =>
        useNuxtApp().$api.put("/auth/logout"),
    signup: (params: any) =>
        useNuxtApp().$api.post("/register", params),
};

export default authService;