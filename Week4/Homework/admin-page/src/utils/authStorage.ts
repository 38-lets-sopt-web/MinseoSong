const USER_ID_STORAGE_KEY = 'sopt-admin-user-id';

export const authStorage = {
  getUserId: () => localStorage.getItem(USER_ID_STORAGE_KEY),
  setUserId: (userId: number) => {
    localStorage.setItem(USER_ID_STORAGE_KEY, String(userId));
  },
  clearUserId: () => {
    localStorage.removeItem(USER_ID_STORAGE_KEY);
  },
};
