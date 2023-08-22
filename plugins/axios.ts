import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";
import { ResponseCode } from "~/constants";
import { MAIN_ROUTER } from "~/route";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const axiosInstance = Axios.create({
        timeout: 3 * 60 * 1000,
        baseURL: config.public.apiBase,
    });

    axiosInstance.interceptors.request.use(
        (config: any) => {
            const token: any = useCookie('auth')
            const auth = token?.value
            if (config) {
                return {
                    ...config,
                    headers: {
                        ...config.headers,
                        Authorization: `${auth?.token_type} ${auth?.access_token}`,
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
        (error: any) => {
            if (error.response?.status === ResponseCode.UNAUTHORIZED)
                navigateTo(MAIN_ROUTER.LOGIN);
            ElMessage.error(error?.response?.data?.message)
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
