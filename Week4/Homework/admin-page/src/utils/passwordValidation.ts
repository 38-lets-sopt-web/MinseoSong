import { VALIDATION_RULES } from '@/constants/authForm';

export const getPasswordError = (password: string) => {
  if (
    password.length < VALIDATION_RULES.passwordMinLength ||
    password.length > VALIDATION_RULES.passwordMaxLength
  ) {
    return '비밀번호는 8~64자로 입력해주세요.';
  }

  if (/\s/.test(password)) {
    return '비밀번호에는 공백을 사용할 수 없어요.';
  }

  if (!/[A-Za-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    return '영어, 숫자, 특수문자를 각각 1자 이상 포함해주세요.';
  }

  return '';
};
