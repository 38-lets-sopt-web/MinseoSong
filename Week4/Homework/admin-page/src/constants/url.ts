const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL 환경 변수가 설정되지 않았습니다.');
}

export const BASE_URL = API_BASE_URL;

export const AUTH_END_POINT = {
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
};

export const USER_END_POINT = {
  USERS: '/users',
  USER: (userId: number) => `/users/${userId}`,
};
