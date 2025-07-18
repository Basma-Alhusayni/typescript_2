type Entry = {
  source: string;
  value: number;
  date?: string;
};

// When page loads, it shows all saved entries
window.addEventListener("DOMContentLoaded", () => {
  loadEntries("income-list");
  loadEntries("expense-list");
  loadEntries("saving-list");
});

// Get saved entries from localStorage
function getStoredEntries(listId: string): Entry[] {
  const data = localStorage.getItem(listId);
  return data ? JSON.parse(data) : [];
}

// Save all entries to localStorage
function saveAllEntries(listId: string, entries: Entry[]): void {
  localStorage.setItem(listId, JSON.stringify(entries));
}

// Add a new entry and save
function saveEntry(listId: string, entry: Entry): void {
  const entries = getStoredEntries(listId);
  entries.push(entry);
  saveAllEntries(listId, entries);
}

// Remove entry by index
function removeEntry(listId: string, index: number): void {
  const entries = getStoredEntries(listId);
  if (index >= 0 && index < entries.length) {
    entries.splice(index, 1);
    saveAllEntries(listId, entries);
  }
}

// Show entry with a delete button
function renderEntry(listId: string, entry: Entry, index: number): void {
  const list = document.getElementById(listId) as HTMLUListElement;
  const li = document.createElement("li");

  if (entry.date) {
    li.textContent =
      entry.source + ": " + entry.value + " on " + entry.date + " ";
  } else {
    li.textContent =
      "Saving Target: " +
      entry.source +
      " - Saving Amount: " +
      entry.value +
      " ";
  }

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.style.marginLeft = "10px";
  delBtn.style.backgroundColor = "#9c0000ff";
  delBtn.style.color = "white";
  delBtn.style.border = "none";
  delBtn.style.borderRadius = "3px";
  delBtn.style.padding = "2px 6px";
  delBtn.style.fontSize = "12px";
  delBtn.style.cursor = "pointer";
  delBtn.style.height = "22px";
  delBtn.style.lineHeight = "18px";

  delBtn.addEventListener("click", () => {
    removeEntry(listId, index);
    renderList(listId);
  });

  li.appendChild(delBtn);
  list.appendChild(li);
}

// Show all entries in a list
function renderList(listId: string): void {
  const list = document.getElementById(listId) as HTMLUListElement;
  list.innerHTML = "";
  const entries = getStoredEntries(listId);
  entries.forEach((entry, idx) => renderEntry(listId, entry, idx));
}

// Load and show entries
function loadEntries(listId: string): void {
  renderList(listId);
}

// Add entry and update UI
function addEntry(listId: string, entry: Entry): void {
  saveEntry(listId, entry);
  renderList(listId);
}

// Income form submit handler
const incomeForm = document.getElementById("income-form") as HTMLFormElement;
incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const source = (document.getElementById("income-source") as HTMLInputElement)
    .value;
  const value = parseFloat(
    (document.getElementById("income-value") as HTMLInputElement).value
  );
  const date = (document.getElementById("income-date") as HTMLInputElement)
    .value;
  addEntry("income-list", { source, value, date });
  incomeForm.reset();
});

// Expense form submit handler
const expenseForm = document.getElementById("expense-form") as HTMLFormElement;
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const source = (document.getElementById("expense-source") as HTMLInputElement)
    .value;
  const value = parseFloat(
    (document.getElementById("expense-value") as HTMLInputElement).value
  );
  const date = (document.getElementById("expense-date") as HTMLInputElement)
    .value;
  addEntry("expense-list", { source, value, date });
  expenseForm.reset();
});

// Saving form submit handler
const savingForm = document.getElementById("saving-form") as HTMLFormElement;
savingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const source = (document.getElementById("saving-name") as HTMLInputElement)
    .value;
  const value = parseFloat(
    (document.getElementById("saving-amount") as HTMLInputElement).value
  );
  addEntry("saving-list", { source, value });
  savingForm.reset();
});
