import { VALIDATION_RULES } from '@/constants/authForm';

export const isEmailValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isAgeValid = (age: string) => {
  const numericAge = Number(age);

  return (
    Number.isInteger(numericAge) &&
    numericAge >= VALIDATION_RULES.ageMin &&
    numericAge <= VALIDATION_RULES.ageMax
  );
};
