import { AxiosError } from 'axios';
import type { ApiResponse } from '@/types/api';

const isApiResponse = (value: unknown): value is ApiResponse => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return 'message' in value && typeof value.message === 'string';
};

export const getApiErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (isApiResponse(data)) {
      return data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '요청 처리 중 오류가 발생했습니다.';
};

export const createApiError = (error: unknown) =>
  new Error(getApiErrorMessage(error), { cause: error });
