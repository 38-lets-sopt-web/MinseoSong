import { initializeExpenses } from "./storage.js";
import { initializeSelectOptions, bindEvents } from "./events.js";
import { render } from "./render.js";

function init() {
  initializeExpenses();
  initializeSelectOptions();
  bindEvents();
  render();
}

init();
