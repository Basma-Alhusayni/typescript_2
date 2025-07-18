"use strict";
// When page loads, it shows all saved entries
window.addEventListener("DOMContentLoaded", () => {
    loadEntries("income-list");
    loadEntries("expense-list");
    loadEntries("saving-list");
});
// Get saved entries from localStorage
function getStoredEntries(listId) {
    const data = localStorage.getItem(listId);
    return data ? JSON.parse(data) : [];
}
// Save all entries to localStorage
function saveAllEntries(listId, entries) {
    localStorage.setItem(listId, JSON.stringify(entries));
}
// Add a new entry and save
function saveEntry(listId, entry) {
    const entries = getStoredEntries(listId);
    entries.push(entry);
    saveAllEntries(listId, entries);
}
// Remove entry by index
function removeEntry(listId, index) {
    const entries = getStoredEntries(listId);
    if (index >= 0 && index < entries.length) {
        entries.splice(index, 1);
        saveAllEntries(listId, entries);
    }
}
// Show entry with a delete button
function renderEntry(listId, entry, index) {
    const list = document.getElementById(listId);
    const li = document.createElement("li");
    if (entry.date) {
        li.textContent =
            entry.source + ": " + entry.value + " on " + entry.date + " ";
    }
    else {
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
function renderList(listId) {
    const list = document.getElementById(listId);
    list.innerHTML = "";
    const entries = getStoredEntries(listId);
    entries.forEach((entry, idx) => renderEntry(listId, entry, idx));
}
// Load and show entries
function loadEntries(listId) {
    renderList(listId);
}
// Add entry and update UI
function addEntry(listId, entry) {
    saveEntry(listId, entry);
    renderList(listId);
}
// Income form submit handler
const incomeForm = document.getElementById("income-form");
incomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const source = document.getElementById("income-source")
        .value;
    const value = parseFloat(document.getElementById("income-value").value);
    const date = document.getElementById("income-date")
        .value;
    addEntry("income-list", { source, value, date });
    incomeForm.reset();
});
// Expense form submit handler
const expenseForm = document.getElementById("expense-form");
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const source = document.getElementById("expense-source")
        .value;
    const value = parseFloat(document.getElementById("expense-value").value);
    const date = document.getElementById("expense-date")
        .value;
    addEntry("expense-list", { source, value, date });
    expenseForm.reset();
});
// Saving form submit handler
const savingForm = document.getElementById("saving-form");
savingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const source = document.getElementById("saving-name")
        .value;
    const value = parseFloat(document.getElementById("saving-amount").value);
    addEntry("saving-list", { source, value });
    savingForm.reset();
});
