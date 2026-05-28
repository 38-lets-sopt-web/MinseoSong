import axios, { type AxiosRequestConfig } from 'axios';
import { BASE_URL } from '@/constants/url';
import { createApiError } from '@/utils/apiError';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await instance.get<T>(url, config);

    return response.data;
  } catch (error) {
    throw createApiError(error);
  }
};

export const post = async <T, P = unknown>(url: string, payload?: P, config?: AxiosRequestConfig) => {
  try {
    const response = await instance.post<T>(url, payload, config);

    return response.data;
  } catch (error) {
    throw createApiError(error);
  }
};

export const patch = async <T, P = unknown>(url: string, payload?: P, config?: AxiosRequestConfig) => {
  try {
    const response = await instance.patch<T>(url, payload, config);

    return response.data;
  } catch (error) {
    throw createApiError(error);
  }
};
