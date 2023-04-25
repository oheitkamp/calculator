const display = document.querySelector('.display');
const keys = document.querySelector('.keys');

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function inputDigit(digit) {
	if (waitingForSecondOperand) {
		display.textContent = digit;
		waitingForSecondOperand = false;
	} else {
		display.textContent = display.textContent === '0' ? digit : display.textContent + digit;
	}
}

function inputDecimal() {
	if (waitingForSecondOperand) return;

	if (!display.textContent.includes('.')) {
		display.textContent += '.';
	}
}

function handleOperator(nextOperator) {
	const inputValue = parseFloat(display.textContent);

	if (operator && waitingForSecondOperand) {
		operator = nextOperator;
		return;
	}

	if (firstOperand === null) {
		firstOperand = inputValue;
	} else if (operator) {
		const result = calculate(firstOperand, inputValue, operator);
		display.textContent = result;
		firstOperand = result;
	}

	waitingForSecondOperand = true;
	operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
	switch (operator) {
		case '+':
			return firstOperand + secondOperand;
		case '-':
			return firstOperand - secondOperand;
		case 'x':
			return firstOperand * secondOperand;
		case '÷':
			return firstOperand / secondOperand;
		case '%':
			return firstOperand % secondOperand;
		default:
			return secondOperand;
	}
}

function clear() {
	display.textContent = '0';
	firstOperand = null;
	operator = null;
	waitingForSecondOperand = false;
}

function backspace() {
	if (waitingForSecondOperand) return;

	display.textContent = display.textContent.slice(0, -1);

	if (display.textContent === '') {
		display.textContent = '0';
	}
}

keys.addEventListener('click', e => {
	if (!e.target.matches('button')) return;

	switch (e.target.id) {
		case 'clear':
			clear();
			break;
		case 'backspace':
			backspace();
			break;
		case 'decimal':
			inputDecimal();
			break;
		case 'add':
		case 'subtract':
		case 'multiply':
		case 'divide':
		case 'percent':
			handleOperator(e.target.id);
			break;
		default:
			inputDigit(e.target.textContent);
	}
});