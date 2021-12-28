const buttons = document.querySelector(".calc__body");
const output = document.querySelector(".calc__result");
const text = document.querySelector(".calc__text");
const equal = document.querySelector("#btn-equal");
const clear = document.querySelector("#btn-clear");

var firstOperand = "";
var secondOperand = "";
var result = 0;
var operator;

buttons.addEventListener("click", getData);
equal.addEventListener("click", calculate);
clear.addEventListener("click", clearAll);

function getData(e) {
	{
		let btn = e.target;
		console.log(btn.className);
		if (btn.className.includes("num")) {
			if (!operator) {
				if (result) {
					clearAll();
				}
				firstOperand += btn.innerText;
				console.log(firstOperand);
				output.innerText = firstOperand;
			} else {
				secondOperand += btn.innerText;
				console.log(secondOperand);
				text.innerText = `${firstOperand} ${operator}`;
				output.innerText = secondOperand;
			}
		} else if (btn.className.includes("op")) {
			if (firstOperand) {
				if (secondOperand) {
					calculate();
				}
				operator = btn.innerText;
				text.innerText = firstOperand;
				output.innerText = operator;
				console.log(operator);
			}
		}
	}
}

function calculate() {
	if (firstOperand && secondOperand) {
		let firstNum = Number(firstOperand);
		let secondNum = Number(secondOperand);
		if (operator === "+") {
			result = firstNum + secondNum;
		} else if (operator === "-") {
			result = firstNum - secondNum;
		} else if (operator === "*") {
			result = firstNum * secondNum;
		} else if (operator === "/") {
			result = firstNum / secondNum;
		} else if (operator === "%") {
			result = firstNum % secondNum;
		} else if (operator === "^") {
			result = firstNum ** secondNum;
		}
		result = result.toFixed(1).toString();
		text.innerText = `${firstOperand} ${operator} ${secondOperand}`;
		output.innerText = result;
		firstOperand = result;
		secondOperand = "";
		operator = undefined;
	}
}

function clearAll() {
	firstOperand = "";
	secondOperand = "";
	operator = undefined;
	result = 0;
	text.innerText = 0;
	output.innerText = 0;
}
