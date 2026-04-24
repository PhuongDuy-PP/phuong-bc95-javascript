const numbers = [];

const numberInput = document.getElementById("numberInput");
const btnAdd = document.getElementById("btnAdd");
const btnSumPositive = document.getElementById("btnSumPositive");
const arrayDisplay = document.getElementById("arrayDisplay");
const result = document.getElementById("result");

const renderArray = () => {
  arrayDisplay.textContent = `Mảng hiện tại: [${numbers.join(", ")}]`;
};

const addNumber = () => {
  const value = Number(numberInput.value);

  if (!Number.isInteger(value)) {
    result.textContent = "Vui lòng nhập số nguyên hợp lệ.";
    return;
  }

  numbers.push(value);
  renderArray();
  result.textContent = "Đã thêm số vào mảng.";
  numberInput.value = "";
  numberInput.focus();
};

const sumPositiveNumbers = () => {
  const positiveNumbers = numbers.filter((num) => num > 0);
  const sum = positiveNumbers.reduce((total, num) => total + num, 0);
  result.textContent = `Tổng các số dương trong mảng là: ${sum}`;
};

btnAdd.addEventListener("click", addNumber);
btnSumPositive.addEventListener("click", sumPositiveNumbers);

numberInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNumber();
  }
});
