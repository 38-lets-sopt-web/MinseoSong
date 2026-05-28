import { get, patch } from '@/apis/axiosInstance';
import { mapUserDtoToProfile, mapUsersResponseDtoToSummaries } from '@/apis/mappers/userMapper';
import { USER_END_POINT } from '@/constants/url';
import type { ApiResponse } from '@/types/api';
import type { UserDto, UserUpdateRequest, UsersResponseDto } from '@/types/user';
import { unwrapApiData } from '@/utils/apiResponse';

export const getUser = async (userId: number) => {
  const response = await get<ApiResponse<UserDto>>(USER_END_POINT.USER(userId));

  return mapUserDtoToProfile(unwrapApiData(response));
};

export const getUsers = async () => {
  const response = await get<ApiResponse<UsersResponseDto>>(USER_END_POINT.USERS);

  return mapUsersResponseDtoToSummaries(unwrapApiData(response));
};

export const updateUser = async (userId: number, payload: UserUpdateRequest) => {
  const response = await patch<ApiResponse<UserDto>, UserUpdateRequest>(
    USER_END_POINT.USER(userId),
    payload,
  );

  return mapUserDtoToProfile(unwrapApiData(response));
};
