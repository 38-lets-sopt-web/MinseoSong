import { getExpenses } from "./storage.js";
import { state } from "./state.js";
import { getFilteredExpenses, getTotalAmount } from "./selectors.js";
import { formatAmount, getAmountClassName, getExpenseType } from "./utils.js";
import { openModal } from "./modal.js";

const tableBody = document.getElementById("expense-table-body");
const totalRow = document.getElementById("total-row");
const selectAll = document.getElementById("select-all");
const detailModal = document.getElementById("detail-modal");
const detailContent = document.getElementById("detail-content");

export function renderSummary(expenses) {
  const total = getTotalAmount(expenses);
  totalRow.textContent = `합계: ${formatAmount(total)}`;
}

export function renderDetailModal(expenseId) {
  const expenses = getExpenses();
  const selectedExpense = expenses.find(
    (expense) => Number(expense.id) === Number(expenseId),
  );

  if (!selectedExpense) return;

  detailContent.innerHTML = `
    <div class="detail-item"><strong>제목</strong> : ${selectedExpense.title}</div>
    <div class="detail-item"><strong>금액</strong> : ${formatAmount(selectedExpense.amount)}</div>
    <div class="detail-item"><strong>날짜</strong> : ${selectedExpense.date}</div>
    <div class="detail-item"><strong>유형</strong> : ${getExpenseType(selectedExpense.amount)}</div>
    <div class="detail-item"><strong>카테고리</strong> : ${selectedExpense.category}</div>
    <div class="detail-item"><strong>결제수단</strong> : ${selectedExpense.payment}</div>
  `;

  openModal(detailModal);
}

export function syncSelectAllStatus() {
  const checkboxes = document.querySelectorAll(".row-checkbox");

  if (checkboxes.length === 0) {
    selectAll.checked = false;
    return;
  }

  const checkedCount = [...checkboxes].filter(
    (checkbox) => checkbox.checked,
  ).length;
  selectAll.checked = checkedCount === checkboxes.length;
}

export function renderTable(expenses) {
  tableBody.innerHTML = "";

  if (expenses.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="6">조건에 맞는 내역이 없습니다.</td>`;
    tableBody.appendChild(emptyRow);
    renderSummary(expenses);
    syncSelectAllStatus();
    return;
  }

  expenses.forEach((expense) => {
    const row = document.createElement("tr");
    const isChecked = state.selectedIds.has(Number(expense.id));

    row.innerHTML = `
      <td>
        <input type="checkbox" class="row-checkbox" data-id="${expense.id}" ${isChecked ? "checked" : ""} />
      </td>
      <td>
        <button type="button" class="expense-title-button" data-detail-id="${expense.id}">
          ${expense.title}
        </button>
      </td>
      <td class="${getAmountClassName(expense.amount)}">${formatAmount(expense.amount)}</td>
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>${expense.payment}</td>
    `;

    tableBody.appendChild(row);
  });

  renderSummary(expenses);
  syncSelectAllStatus();
}

export function render() {
  const expenses = getExpenses();
  const visibleExpenses = getFilteredExpenses(
    expenses,
    state.filters,
    state.sortOrder,
  );

  const visibleIds = new Set(
    visibleExpenses.map((expense) => Number(expense.id)),
  );
  state.selectedIds = new Set(
    [...state.selectedIds].filter((id) => visibleIds.has(id)),
  );

  renderTable(visibleExpenses);
}
