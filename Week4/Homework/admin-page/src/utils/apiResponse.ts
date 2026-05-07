import type { ApiResponse } from '@/types/api';

export const unwrapApiData = <T>(response: ApiResponse<T>) => {
  if (response.data === undefined) {
    throw new Error(response.message);
  }

  return response.data;
};
