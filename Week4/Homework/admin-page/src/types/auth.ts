import type { Part } from '@/types/user';

export interface SignInRequest {
  loginId: string;
  password: string;
}

export interface SignUpRequest extends SignInRequest {
  name: string;
  email: string;
  age: number;
  part: Part;
}

export interface SignInResponseDto {
  userId: number;
}

export interface AuthSession {
  userId: number;
}
