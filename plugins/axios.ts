import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";
import { MAIN_ROUTER } from "~/route";
import { ResponseCode } from "~/constants";
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const axiosInstance = Axios.create({
        timeout: 3 * 60 * 1000,
        baseURL: config.public.apiBase + "/admin",
    });

    axiosInstance.interceptors.request.use(
        (config: any) => {
            const auth: any = useAuthStore()
            if (config) {
                return {
                    ...config,
                    headers: {
                        ...config.headers,
                        Authorization: `${auth?.session?.token_type} ${auth?.session?.access_token}`,
                    },
                };
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response.data;
        },
        (error: AxiosError) => {
            if (error.response?.status === ResponseCode.UNAUTHORIZED)
                navigateTo(MAIN_ROUTER.LOGIN);
            return Promise.reject(error?.response?.data);
        }
    );
    return {
        provide: {
            api: {
                get<ReqType, ResType>(url: string, params?: ReqType): Promise<ResType> {
                    return axiosInstance.get(url, {
                        params,
                        paramsSerializer: function (params) {
                            return queryString.stringify(params);
                        },
                    });
                },
                post<ReqType, ResType>(
                    url: string,
                    data?: ReqType,
                    config?: AxiosRequestConfig<ReqType>
                ): Promise<ResType> {
                    return axiosInstance.post(url, data, config);
                },
                put<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
                    return axiosInstance.put(url, data);
                },
                patch<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
                    return axiosInstance.patch(url, data);
                },
                delete<ReqType, ResType>(
                    url: string,
                    data?: ReqType
                ): Promise<ResType> {
                    return axiosInstance.delete(url, { data });
                },
                getCSV<ReqType, ResType>(
                    url: string,
                    params?: ReqType
                ): Promise<ResType> {
                    return axiosInstance.get(url, {
                        params,
                        responseType: "blob",
                    });
                },
            },
        },
    };
});
