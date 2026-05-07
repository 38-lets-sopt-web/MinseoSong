import { post } from '@/apis/axiosInstance';
import { mapSignInResponseDtoToSession } from '@/apis/mappers/authMapper';
import { AUTH_END_POINT } from '@/constants/url';
import type { ApiResponse } from '@/types/api';
import type { SignInRequest, SignInResponseDto, SignUpRequest } from '@/types/auth';
import { unwrapApiData } from '@/utils/apiResponse';

export const signIn = async (payload: SignInRequest) => {
  const response = await post<ApiResponse<SignInResponseDto>, SignInRequest>(
    AUTH_END_POINT.SIGN_IN,
    payload,
  );

  return mapSignInResponseDtoToSession(unwrapApiData(response));
};

export const signUp = async (payload: SignUpRequest) => {
  await post<ApiResponse, SignUpRequest>(AUTH_END_POINT.SIGN_UP, payload);
};
