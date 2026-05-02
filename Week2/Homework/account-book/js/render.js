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

function createTableCell(text, className) {
  const cell = document.createElement("td");
  cell.textContent = text;

  if (className) {
    cell.className = className;
  }

  return cell;
}

function createDetailItem(label, value) {
  const item = document.createElement("div");
  item.className = "detail-item";

  const title = document.createElement("strong");
  title.textContent = label;

  item.append(title, ` : ${value}`);

  return item;
}

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

  detailContent.replaceChildren(
    createDetailItem("제목", selectedExpense.title),
    createDetailItem("금액", formatAmount(selectedExpense.amount)),
    createDetailItem("날짜", selectedExpense.date),
    createDetailItem("유형", getExpenseType(selectedExpense.amount)),
    createDetailItem("카테고리", selectedExpense.category),
    createDetailItem("결제수단", selectedExpense.payment),
  );

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
  tableBody.replaceChildren();

  if (expenses.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = createTableCell("조건에 맞는 내역이 없습니다.");
    emptyCell.colSpan = 6;

    emptyRow.appendChild(emptyCell);
    tableBody.appendChild(emptyRow);
    renderSummary(expenses);
    syncSelectAllStatus();
    return;
  }

  expenses.forEach((expense) => {
    const row = document.createElement("tr");
    const isChecked = state.selectedIds.has(Number(expense.id));

    const checkboxCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "row-checkbox";
    checkbox.dataset.id = expense.id;
    checkbox.checked = isChecked;
    checkboxCell.appendChild(checkbox);

    const titleCell = document.createElement("td");
    const titleButton = document.createElement("button");
    titleButton.type = "button";
    titleButton.className = "expense-title-button";
    titleButton.dataset.detailId = expense.id;
    titleButton.textContent = expense.title;
    titleCell.appendChild(titleButton);

    row.append(
      checkboxCell,
      titleCell,
      createTableCell(
        formatAmount(expense.amount),
        getAmountClassName(expense.amount),
      ),
      createTableCell(expense.date),
      createTableCell(expense.category),
      createTableCell(expense.payment),
    );

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
