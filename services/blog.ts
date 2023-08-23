const blogService = {
    getBlogs: (params: { name: string, page: number, limit: number }) =>
        useNuxtApp().$api.get('/blogs', params),
    getBlogDetail: (id: number) =>
        useNuxtApp().$api.get(`blog/${id}`),
    deleteBlog: (id: number) =>
        useNuxtApp().$api.delete(`blog/${id}`),
    updateBlog: (params: any) =>
        useNuxtApp().$api.put(`blog/${params.id}`, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }),
    createBlog: (params: any) =>
        useNuxtApp().$api.post(`blog`, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }),
};

export default blogService;