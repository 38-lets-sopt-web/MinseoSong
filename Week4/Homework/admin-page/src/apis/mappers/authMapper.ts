import type { AuthSession, SignInResponseDto } from '@/types/auth';

export const mapSignInResponseDtoToSession = (response: SignInResponseDto): AuthSession => ({
  userId: response.userId,
});
