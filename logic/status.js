function getCountList() {
  let countArray = JSON.parse(localStorage.getItem('countList'));
  for(i in countArray) {
    const tbody = document.getElementById('food-table');
    const tr = document.createElement('tr');
    tr.setAttribute('onclick', 'selectRow(this);');
    let cell1 = document.createElement('td');
    let cell2 = document.createElement('td');
    cell1.innerHTML = countArray[i].food;
    cell2.innerHTML = countArray[i].calories;
    tr.append(cell1, cell2);
    tbody.append(tr);
  };
};


function reset() {
  if (confirm("Are you sure you want to Reset?") == true) {
    localStorage.setItem('countList', 0);
  }
  clearSelection();
}


function clearSelection() {
  document.querySelector('tbody').remove();
  document.querySelector('table').append(document.createElement('tbody'));
  document.querySelector('tbody').setAttribute('id', 'food-table');
  getCountList();
}


function removeFood() {
  if (confirm("Are you sure you want to Remove?") == true) {
    let countArray = JSON.parse(localStorage.getItem('countList'));
    countArray.splice(rowNumber - 1, 1);    
    localStorage.setItem('countList', JSON.stringify(countArray));
  };
clearSelection();
  previousRow = "";
};


// Select Row
let previousRow;
let rowNumber;
function selectRow(rowElement) {
	let itemTable = document.querySelector('table');
	rowNumber = rowElement.rowIndex;
  let itemcode = 0;
	let itemcodeEntry = 1;
	if (previousRow) {
		if (previousRow % 2 == 0) {
      itemTable.rows[previousRow].cells[itemcode].style.backgroundColor = "rgb(208, 222, 250)";
			itemTable.rows[previousRow].cells[itemcodeEntry].style.backgroundColor = "rgb(208, 222, 250)";
		}
		else {
      itemTable.rows[previousRow].cells[itemcode].style.backgroundColor = "rgb(173, 203, 248)";
			itemTable.rows[previousRow].cells[itemcodeEntry].style.backgroundColor = "rgb(173, 203, 248)";
		};
	};
  itemTable.rows[rowNumber].cells[itemcode].style.backgroundColor = "rgba(86, 83, 252, 0.719)";
	itemTable.rows[rowNumber].cells[itemcodeEntry].style.backgroundColor = "rgba(86, 83, 252, 0.719)";
  previousRow = rowNumber;
};


// Count Display

let totalCalories = 0;
// Ongoing account
let countArrayList = JSON.parse(localStorage.getItem('countList'));
for (i in countArrayList) {
  let newCalories = parseInt(countArrayList[i].calories);
  totalCalories += newCalories;
}
document.getElementById('ongoing-count').innerHTML = totalCalories;

let dailyCalories = JSON.parse(localStorage.getItem('dailyCalories'));
let remainCalories = parseInt(dailyCalories) - totalCalories;
document.getElementById('remain-count').innerHTML = remainCalories;


getCountList();