// Select the display and history list elements
const calcDisplay = document.getElementById("calcDisplay");
const historyList = document.getElementById("historyList");

// Function to append a value to the display
function appendValue(value) {
  calcDisplay.value += value;
}

// Function to clear the display
function clearDisplay() {
  calcDisplay.value = "";
}

// Function to delete the last character
function deleteLast() {
  calcDisplay.value = calcDisplay.value.slice(0, -1);
}

// Function to evaluate the expression and add it to history
function calculate() {
  try {
    const result = eval(calcDisplay.value); // Evaluate the expression
    const calculation = `${calcDisplay.value} = ${result}`;
    addToHistory(calculation);
    calcDisplay.value = result; // Display the result
  } catch (error) {
    alert("Invalid calculation");
  }
}

// Function to add a calculation to the history
function addToHistory(calculation) {
  const li = document.createElement("li");
  li.textContent = calculation;
  historyList.appendChild(li);
}
