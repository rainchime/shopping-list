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

const form = document.querySelector('#item-form');
const formInput = document.querySelector('#item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.querySelector('#clear');
const filterItem = document.getElementById('filter');

function addItem(e) {
  e.preventDefault();

  const formText = formInput.value;

  // validate input
  if (formText === '') {
    confirm('Please enter an item');
    return;
  }
  // create list item
  const li = document.createElement('li');
  // add classes to li
  li.appendChild(document.createTextNode(formText));

  const btn = createBtn('remove-item btn-link text red');
  li.appendChild(btn);

  itemList.appendChild(li);

  resetUI();
  formInput.value = '';
}

function createBtn(classes) {
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

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
    resetUI();
  }
}

function clearItems() {
  //   itemList.remove();
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  resetUI();
}

function resetUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    filterItem.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    filterItem.style.display = 'flex';
    clearBtn.style.display = 'flex';
  }
}

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

resetUI();
