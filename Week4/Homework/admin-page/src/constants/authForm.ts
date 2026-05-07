import type { Part } from '@/types/user';

export const PART_OPTIONS: Part[] = ['iOS', '안드로이드', '웹'];

export const VALIDATION_RULES = {
  loginIdMaxLength: 50,
  passwordMinLength: 8,
  passwordMaxLength: 64,
  nameMaxLength: 10,
  ageMin: 1,
  ageMax: 150,
};
