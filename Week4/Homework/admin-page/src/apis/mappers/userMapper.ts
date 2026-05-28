import type { UserDto, UserProfile, UserSummary, UserSummaryDto, UsersResponseDto } from '@/types/user';

export const mapUserDtoToProfile = (user: UserDto): UserProfile => ({
  id: user.id,
  loginId: user.loginId,
  name: user.name,
  email: user.email,
  age: user.age,
  part: user.part,
});

export const mapUserSummaryDtoToSummary = (user: UserSummaryDto): UserSummary => ({
  id: user.id,
  name: user.name,
  part: user.part,
});

export const mapUsersResponseDtoToSummaries = (response: UsersResponseDto): UserSummary[] =>
  response.users.map(mapUserSummaryDtoToSummary);
