import { initialExpenses } from "./data.js";

const STORAGE_KEY = "expenses";

export function initializeExpenses() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialExpenses));
  }
}

export function getExpenses() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return [];

  try {
    const parsedData = JSON.parse(savedData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData;
  } catch (error) {
    return [];
  }
}

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}
