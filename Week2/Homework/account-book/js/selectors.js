import { getExpenseType } from "./utils.js";

export function getFilteredExpenses(expenses, filters, sortOrder) {
  const keywordValue = filters.keyword.trim().toLowerCase();
  const typeValue = filters.type.trim();
  const categoryValue = filters.category.trim();
  const paymentValue = filters.payment.trim();

  const filtered = expenses.filter((expense) => {
    const expenseType = getExpenseType(expense.amount);

    const matchesKeyword =
      keywordValue === "" ||
      [
        expense.id,
        expense.title,
        expense.date,
        expense.category,
        expense.payment,
        expense.amount,
        expenseType,
      ].some((value) => String(value).toLowerCase().includes(keywordValue));

    const matchesType = typeValue === "" || expenseType === typeValue;
    const matchesCategory =
      categoryValue === "" || expense.category === categoryValue;
    const matchesPayment =
      paymentValue === "" || expense.payment === paymentValue;

    return matchesKeyword && matchesType && matchesCategory && matchesPayment;
  });

  return filtered.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.date.localeCompare(b.date) || Number(a.id) - Number(b.id);
    }

    return b.date.localeCompare(a.date) || Number(b.id) - Number(a.id);
  });
}

export function getTotalAmount(expenses) {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
}
