import {
  EXPENSE_TYPE_OPTIONS,
  EXPENSE_CATEGORY_OPTIONS,
  EXPENSE_PAYMENT_OPTIONS,
} from "./constants.js";
import { fillSelect } from "./utils.js";
import { state } from "./state.js";
import { getExpenses, saveExpenses, getNextExpenseId } from "./storage.js";
import { closeModal, openModal } from "./modal.js";
import { render, renderDetailModal, syncSelectAllStatus } from "./render.js";

const filterForm = document.getElementById("filter-form");
const filterKeyword = document.getElementById("filter-keyword");
const filterType = document.getElementById("filter-type");
const filterCategory = document.getElementById("filter-category");
const filterPayment = document.getElementById("filter-payment");
const resetFilterButton = document.getElementById("reset-filter-button");

const sortOrder = document.getElementById("sort-order");
const selectAll = document.getElementById("select-all");

const openModalButton = document.getElementById("open-modal-button");
const deleteButton = document.getElementById("delete-button");
const refreshButton = document.getElementById("refresh-button");

const addModal = document.getElementById("add-modal");
const detailModal = document.getElementById("detail-modal");
const addForm = document.getElementById("add-form");

const addType = document.getElementById("add-type");
const addCategory = document.getElementById("add-category");
const addPayment = document.getElementById("add-payment");

export function initializeSelectOptions() {
  fillSelect(filterType, EXPENSE_TYPE_OPTIONS, true);
  fillSelect(filterCategory, EXPENSE_CATEGORY_OPTIONS, true);
  fillSelect(filterPayment, EXPENSE_PAYMENT_OPTIONS, true);

  fillSelect(addType, EXPENSE_TYPE_OPTIONS);
  fillSelect(addCategory, EXPENSE_CATEGORY_OPTIONS);
  fillSelect(addPayment, EXPENSE_PAYMENT_OPTIONS);
}

function updateFiltersFromInputs() {
  state.filters.keyword = filterKeyword.value;
  state.filters.type = filterType.value;
  state.filters.category = filterCategory.value;
  state.filters.payment = filterPayment.value;
}

function resetFilters() {
  filterForm.reset();
  state.filters.keyword = "";
  state.filters.type = "";
  state.filters.category = "";
  state.filters.payment = "";
  render();
}

function addExpense(newExpense) {
  const expenses = getExpenses();
  const nextExpense = {
    id: getNextExpenseId(expenses),
    ...newExpense,
  };

  saveExpenses([...expenses, nextExpense]);
}

function deleteSelectedExpenses() {
  if (state.selectedIds.size === 0) {
    alert("삭제할 항목을 선택해 주세요.");
    return;
  }

  const expenses = getExpenses();
  const nextExpenses = expenses.filter(
    (expense) => !state.selectedIds.has(Number(expense.id)),
  );

  saveExpenses(nextExpenses);
  state.selectedIds.clear();
  render();
}

function submitAddForm(event) {
  event.preventDefault();

  const formData = new FormData(addForm);

  const title = String(formData.get("title")).trim();
  const date = String(formData.get("date")).trim();
  const type = String(formData.get("type")).trim();
  const category = String(formData.get("category")).trim();
  const payment = String(formData.get("payment")).trim();
  const amount = String(formData.get("amount")).trim();

  if (!title || !date || !type || !category || !payment || !amount) {
    alert("모든 값을 입력해 주세요.");
    return;
  }

  const normalizedAmount =
    type === "지출" ? -Math.abs(Number(amount)) : Math.abs(Number(amount));

  addExpense({
    title,
    date,
    category,
    payment,
    amount: normalizedAmount,
  });

  addForm.reset();
  closeModal(addModal);
  render();
}

function handleDocumentClick(event) {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const closeTarget = target.dataset.close;

  if (closeTarget === "add-modal") {
    closeModal(addModal);
  }

  if (closeTarget === "detail-modal") {
    closeModal(detailModal);
  }

  if (target.matches(".expense-title-button")) {
    renderDetailModal(target.dataset.detailId);
  }

  if (target.id === "select-all") {
    const isChecked = target.checked;
    const checkboxes = document.querySelectorAll(".row-checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
      const id = Number(checkbox.dataset.id);

      if (isChecked) {
        state.selectedIds.add(id);
      } else {
        state.selectedIds.delete(id);
      }
    });

    syncSelectAllStatus();
  }

  if (target.matches(".row-checkbox")) {
    const id = Number(target.dataset.id);

    if (target.checked) {
      state.selectedIds.add(id);
    } else {
      state.selectedIds.delete(id);
    }

    syncSelectAllStatus();
  }
}

export function bindEvents() {
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateFiltersFromInputs();
    render();
  });

  resetFilterButton.addEventListener("click", resetFilters);

  sortOrder.addEventListener("change", () => {
    state.sortOrder = sortOrder.value;
    render();
  });

  openModalButton.addEventListener("click", () => {
    openModal(addModal);
  });

  deleteButton.addEventListener("click", deleteSelectedExpenses);

  refreshButton.addEventListener("click", () => {
    window.location.reload();
  });

  addForm.addEventListener("submit", submitAddForm);

  document.addEventListener("click", handleDocumentClick);
}
