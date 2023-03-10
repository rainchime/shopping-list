'use strict';
/*
Shopping List Project Specs
1. Add items to list via form
2. Remove items from list by clicking the "X" button
3. Clear all items with "clear" button
4. Filter the items by typing in the filter field
5. Add localStorage to persist items
6. Click on an item to put into "edit" mode and add to form
7. Update item
8. Deploy to Netlify
*/

const itemForm = document.querySelector('#item-form');
const formBtn = itemForm.querySelector('button');
const itemInput = document.querySelector('#item-input');
const itemFilter = document.querySelector('#filter');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
let isEditMode = false;

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // validate input
  if (newItem === '') {
    alert('Please enter an item');
    return;
  }

  // check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    // remove edit list item from localStorage
    removeFromStorage(itemToEdit.textContent);
    // remove edit list item from DOM
    itemToEdit.remove();
    // set edit mode to false
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('This item already exists.');
      return;
    }
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);

  checkUI();
  itemInput.value = '';
}

function getItemFromStorage() {
  // use nullish coalescing operator to create an empty array if the itemms key does not exist in localStorage
  const itemFromStorage = JSON.parse(localStorage.getItem('items') ?? '[]');
  return itemFromStorage;
}

function addItemToStorage(item) {
  let itemFromStorage = getItemFromStorage();
  // update items array with the new item
  itemFromStorage.push(item);
  // store updated array in localStorage
  localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function addItemToDOM(item) {
  // create new li
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const btn = createButton('remove-item btn-link text-red');

  li.appendChild(btn);
  itemList.appendChild(li);
}

function createButton(classes) {
  const btn = document.createElement('button');
  btn.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  btn.appendChild(icon);
  return btn;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeFromDOM(e.target.parentElement.parentElement);
    removeFromStorage(e.target.parentElement.parentElement.textContent);
    checkUI();
  } else if (e.target.tagName === 'LI') {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll('li')
    .forEach((list) => list.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  // change form button to update
  formBtn.innerHTML = '<i class ="fa-solid fa-pen"></i> Update Item';
  // hue, saturation, lightness
  formBtn.style.backgroundColor = 'hsl(220, 50%, 50%)';
  itemInput.value = item.textContent;
}

function removeFromDOM(e) {
  if (confirm('Are you sure?')) {
    e.remove();
  }
}

function removeFromStorage(item) {
  let itemFromStorage = getItemFromStorage();
  // check each element in the localStorage Array against the removed item
  itemFromStorage = itemFromStorage.filter((e) => e != item);
  // store updated array in localStorage
  localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function filterItem() {
  const filterText = itemFilter.value.toLowerCase();
  const items = document.querySelectorAll('li');
  items.forEach((item) => {
    const name = item.textContent;
    if (name.includes(filterText)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function clearItem() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  // clear from localStorage
  localStorage.removeItem('items');
  checkUI();
}

function displayUI() {
  const itemFromStorage = getItemFromStorage();
  itemFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function checkUI() {
  itemInput.value = '';

  const items = document.querySelectorAll('li');

  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    itemFilter.style.display = 'flex';
    clearBtn.style.display = 'flex';
  }

  formBtn.innerHTML = '<i class ="fa-solid fa-plus"></i> Add Item';
  formBtn.style = '';

  isEditMode = false;
}

function init() {
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItem);
  itemFilter.addEventListener('keyup', filterItem);
  document.addEventListener('DOMContentLoaded', displayUI);
  checkUI();
}

init();
