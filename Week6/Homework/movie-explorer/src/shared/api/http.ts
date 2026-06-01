import type { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axios'

export const http = {
  get: async <TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    const response = await axiosInstance.get<TResponse>(url, config)
    return response.data
  },

  post: async <TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    const response = await axiosInstance.post<TResponse>(url, data, config)
    return response.data
  },

  delete: async <TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    const response = await axiosInstance.delete<TResponse>(url, config)
    return response.data
  },
}
