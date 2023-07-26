const digits = document.querySelectorAll("button");
const display = document.querySelector(".display");

let firstNumber = 0, operator = '', secondNumber = '', previousOp = '';

const reset = () => {
  firstNumber = 0;
  operator = '';
  previousOp = '';
  secondNumber = '';
  update(firstNumber, operator, secondNumber);
}

const update = (fNumber, op, sNumber) => {
  display.textContent = `${fNumber}${op}${sNumber}`;
}

const operate = (clicked) => {
  let result;
  switch (operator) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case 'x':
      result = firstNumber * secondNumber;
      break;
    case '/':
      if (secondNumber === 0) {
        display.textContent = 'ERROR';
        setTimeout(reset, 1500);
        return;
      }
      result = firstNumber / secondNumber;
      break;
    case '^':
      result = Math.pow(firstNumber, secondNumber);
      break;
  }

  firstNumber = result;
  if (clicked === '=') {
    previousOp = '=';
    operator = '';
  } else {
    operator = clicked;
  }
  secondNumber = '';
  update(firstNumber, operator, secondNumber);
}

const addDigit = (clicked) => {
  if (previousOp === '=') {
    firstNumber = 0;
  }

  if (operator === '') {
    firstNumber = parseFloat(`${firstNumber}${clicked}`);
  } else {
    secondNumber = parseFloat(`${secondNumber}${clicked}`);
  }

  update(firstNumber, operator, secondNumber);
}

const addOperator = (clicked) => {
  previousOp = clicked;
  if (operator === '') {
    operator = clicked;
    update(firstNumber, operator, secondNumber)
  } else if (operator !== '' && secondNumber === '') {
    operator = clicked;
    update(firstNumber, operator, secondNumber)
  } else {
    operate(clicked);
  }
}

const clicked = (e) => {
  const target = e.target.className;
  const key = e.target.textContent;
  switch (target) {
    case "digit":
      addDigit(key);
      break;
    case "operator":
      addOperator(key);
      break;
    case "special":
      if (key === 'AC') {
        reset();
      } else if (key === 'C') {
        if (secondNumber !== '') {
          secondNumber = secondNumber.toString().slice(0, -1);
        } else if (operator !== '') {
          operator = '';
        } else if (firstNumber.toString().length > 1) {
          firstNumber = firstNumber.toString().slice(0, -1);
        } else {
          firstNumber = 0;
        }
        update(firstNumber, operator, secondNumber);
      } else if (key === ".") {
        if (secondNumber !== '' && !secondNumber.includes('.')) {
          secondNumber += '.';
        } else if (!firstNumber.toString().includes('.')) {
          firstNumber += '.';
        } else {
          return;
        }
        update(firstNumber, operator, secondNumber);
      }else if (key === '+/-') {
        if (operator === '') {
            firstNumber = -firstNumber;
            update(firstNumber, operator, secondNumber);
          } else {
            secondNumber = -secondNumber;
            update(firstNumber, operator, secondNumber);
          }
    }
  }
}

digits.forEach(digit => digit.addEventListener('click', clicked));
