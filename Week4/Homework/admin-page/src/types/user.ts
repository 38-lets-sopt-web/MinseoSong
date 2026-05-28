export type Part = 'iOS' | '안드로이드' | '웹';

export interface UserDto {
  id: number;
  loginId: string;
  name: string;
  email: string;
  age: number;
  part: Part;
}

export interface UserSummaryDto {
  id: number;
  name: string;
  part: Part;
}

export interface UsersResponseDto {
  users: UserSummaryDto[];
}

export interface UserProfile {
  id: number;
  loginId: string;
  name: string;
  email: string;
  age: number;
  part: Part;
}

export interface UserSummary {
  id: number;
  name: string;
  part: Part;
}

export interface UserUpdateRequest {
  name: string;
  email: string;
  age: number;
}
