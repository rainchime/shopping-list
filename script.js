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
const itemList = document.querySelector('#item-list');
const clear = document.querySelector('#clear');
const filter = document.querySelector('#filter');

function addItem(e) {
  e.preventDefault();

  const newItem = formInput.value;

  // validate input
  // formInput brings in the element, we need the value of the element
  if (newItem === '') {
    alert('Please add an item.');
    return;
  }

  // create new li
  const li = document.createElement('li');
  // create textNode using formInput
  const text = document.createTextNode(newItem);
  // create new btn
  const btn = createBtn('remove-item btn-link text-red');

  // append text and btn to li
  li.append(text, btn);
  // append li to itemList
  itemList.appendChild(li);

  // clear formInput value
  formInput.value = '';
}

function createBtn(btnClasses) {
  // create new button
  const btn = document.createElement('button');
  // add class to btn
  btn.className = btnClasses;
  const icon = createIcon('fa-solid fa-xmark');
  // append icon to btn
  btn.appendChild(icon);
  return btn;
}

function createIcon(iconClasses) {
  // create new icon
  const icon = document.createElement('i');
  // add class to icon
  icon.className = iconClasses;
  return icon;
}

function removeItem(e) {
  // check if X is clicked
  if ((e.target.classList.contains = 'remove-item')) {
    // get li associated with the X
    const li = e.target.parentElement.parentElement;
    // remove li from itemList
    itemList.removeChild(li);
  }
}

function clearItems(e) {
  // clear itemList
  itemList.innerHTML = '';
}

function filterItem(e) {
  // get filterInput text
  const filterText = e.target.value.toLowerCase();
  // get all items
  const items = document.querySelectorAll('li');

  items.forEach((e) => {
    // get all item names
    const names = e.innerText.toLowerCase();
    // compare item names with filterText
    // names.includes(filterText)
    //   ? (e.style.display = 'block')
    //   : (e.style.display = 'none');
    e.style.display = names.includes(filterText) ? 'block' : 'none';
  });
}

// Event Listener
form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clear.addEventListener('click', clearItems);
filter.addEventListener('keyup', filterItem);
