// Database
let db;

const request = indexedDB.open("CalorieDB", 1);
request.onerror = function (e) {console.log("Error: " + e)};
request.onsuccess = function (e) {db = request.result; getFoodList();};
request.onupgradeneeded = function (e) {
  db = request.result;
  dbCal = request.result;
  let store = db.createObjectStore("Food", { keyPath: "food", autoIncrement: true });
  store.createIndex("SearchFood", "food", { unique: true });
};


// CRUD ----------------------------------------------------------------------- 
// Add
function addFood(foodForm) {
  event.preventDefault();
  let txReadWrite = db.transaction(["Food"], "readwrite");
  let store = txReadWrite.objectStore("Food");
  store.add({
    food: foodForm.food.value,
    calories: foodForm.calories.value
  });
  clearTable();
  getFoodList();
};


// Read List
function getFoodList() {
  let txRead = db.transaction(["Food"], "readonly");
  let store = txRead.objectStore("Food");
  let cursor = store.openCursor();
  cursor.onsuccess = function (e) {
    cursor = e.target.result;
    if (cursor) {
      console.log(cursor.value.food + " " + cursor.value.calories);
      const tbody = document.getElementById('food-table');
      const tr = document.createElement('tr');
      tr.setAttribute('onclick', 'selectRow(this);');
      let cell1 = document.createElement('td');
      let cell2 = document.createElement('td');
      cell1.innerHTML = cursor.value.food;
      cell2.innerHTML = cursor.value.calories;
      tr.append(cell1, cell2);
      tbody.append(tr);
      cursor.continue();
    };
  };
};



// Read Record
function getFood() {
  let key = document.getElementById("food").value;
  let tx = db.transaction(["Food"], "readwrite");
  let store = tx.objectStore("Food");
  let index = store.index('SearchFood');
  let range = IDBKeyRange.only(key);
  let cursor = index.openCursor(range);
  cursor.onsuccess = function (e) {
    cursor = e.target.result;
    if (cursor) {
      console.log(cursor.value.food + " " + cursor.value.calories);
      let countArray = JSON.parse(localStorage.getItem('countList'));
      if (!countArray) {
        let countArray = [];
        countArray.push({ 
          food : cursor.value.food,
          calories : cursor.value.calories
        });
        localStorage.setItem('countList', JSON.stringify(countArray));
        } else {
        countArray.push({ 
          food : cursor.value.food,
          calories : cursor.value.calories
        });
        localStorage.setItem('countList', JSON.stringify(countArray));  
        };
      clearSelection();
      };
    };
  };
   


// Delete Record
function deleteFood() {
  if (confirm("Are you sure you want to delete?") == true) {
    let key = document.getElementById("food").value;
    let tx = db.transaction(["Food"], "readwrite");
    let store = tx.objectStore("Food");
    store.delete(key);
  };
  clearTable();
  getFoodList(); 
  previousRow = ""; 
};




let previousRow;
// Select row
function selectRow(rowElement) {
	let itemTable = document.querySelector('table');
	let rowNumber = rowElement.rowIndex;
	let itemcodeEntry = 0;
	let itemEntry = 1;
	// Get row data
	let itemcodeData = itemTable.rows[rowNumber].cells[itemcodeEntry].textContent;
	let itemData = itemTable.rows[rowNumber].cells[itemEntry].textContent;
	if (previousRow) {
		if (previousRow % 2 == 0) {
			itemTable.rows[previousRow].cells[itemcodeEntry].style.backgroundColor = "rgb(208, 222, 250)";
			itemTable.rows[previousRow].cells[itemEntry].style.backgroundColor = "rgb(208, 222, 250)";
		}
		else {
			itemTable.rows[previousRow].cells[itemcodeEntry].style.backgroundColor = "rgb(173, 203, 248)";
			itemTable.rows[previousRow].cells[itemEntry].style.backgroundColor = "rgb(173, 203, 248)";
		};
	};
	itemTable.rows[rowNumber].cells[itemcodeEntry].style.backgroundColor = "rgba(86, 83, 252, 0.719)";
	itemTable.rows[rowNumber].cells[itemEntry].style.backgroundColor = "rgba(86, 83, 252, 0.719)";
  previousRow = rowNumber;
	// Display in entry fields
	let formEntries = document.getElementById('food-form');
	formEntries.food.value = itemcodeData;
	formEntries.calories.value = itemData;
};



function clearTable() {
  //reset table
  document.querySelector('tbody').remove();
  document.querySelector('table').append(document.createElement('tbody'));
  document.querySelector('tbody').setAttribute('id', 'food-table');
  document.getElementById('food-form').reset();
}

function clearSelection() {
  clearTable();
  getFoodList(); 
}