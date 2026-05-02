export function createOption(value, includeAllOption = false) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;

  if (includeAllOption && value === "") {
    option.textContent = "전체";
  }

  return option;
}

export function fillSelect(selectElement, options, includeAllOption = false) {
  selectElement.replaceChildren();

  if (includeAllOption) {
    selectElement.append(createOption("", true));
  }

  options.forEach((optionValue) => {
    selectElement.append(createOption(optionValue));
  });
}

export function formatAmount(amount) {
  const numberAmount = Number(amount);
  const sign = numberAmount > 0 ? "+" : "";
  return `${sign}${numberAmount.toLocaleString("ko-KR")}원`;
}

export function getExpenseType(amount) {
  return Number(amount) >= 0 ? "수입" : "지출";
}

export function getAmountClassName(amount) {
  return Number(amount) >= 0 ? "amount-income" : "amount-expense";
}

export function getNextExpenseId(expenses) {
  if (expenses.length === 0) {
    return 1;
  }

  return Math.max(...expenses.map((expense) => Number(expense.id))) + 1;
}
