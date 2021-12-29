const calculator = document.querySelector(".calc");
const buttons = document.querySelector(".calc__body");
const output = document.querySelector(".calc__result");
const text = document.querySelector(".calc__text");
const equal = document.querySelector("#btn-equal");
const clear = document.querySelector("#btn-clear");

var firstOperand = "";
var secondOperand = "";
var result = 0;
var operator = undefined;
var decimal = false;

buttons.addEventListener("click", getData);
equal.addEventListener("click", calculate);
clear.addEventListener("click", clearAll);

function getData(e) {
	let btn = e.target;
	if (btn.className.includes("num")) {
		if (btn.innerText === "." && decimal) return;
		if (btn.innerText === ".") decimal = true;

		if (!operator) {
			if (result) {
				clearAll();
			}
			firstOperand += btn.innerText;
			output.innerText = firstOperand;
		} else {
			secondOperand += btn.innerText;
			text.innerText = `${firstOperand} ${operator}`;
			output.innerText = secondOperand;
		}
	} else if (btn.className.includes("op")) {
		if (firstOperand) {
			if (secondOperand) {
				calculate();
			}
		} else {
			firstOperand = "0";
		}
		operator = btn.innerText;
		text.innerText = firstOperand;
		output.innerText = operator;
	}
}

function calculate() {
	if (firstOperand && secondOperand) {
		let firstNum = Number(firstOperand);
		let secondNum = Number(secondOperand);
		if (operator === "+") {
			result = firstNum + secondNum;
		} else if (operator === "−") {
			result = firstNum - secondNum;
		} else if (operator === "x") {
			result = firstNum * secondNum;
		} else if (operator === "÷") {
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
		decimal = false;

		if (result.length > 11) {
			output.classList.add("result-small");
		}

		if (result === "Infinity" || result === "-Infinity" || result === "NaN") {
			output.innerText = "Really?!😠";
			calculator.classList.add("animate__hinge");
			calculator.addEventListener("animationend", () => {
				calculator.classList.remove("animate__hinge");
				clearAll();
			});
		}
	}
}

function clearAll() {
	firstOperand = "";
	secondOperand = "";
	operator = undefined;
	result = 0;
	decimal = false;
	text.innerText = 0;
	output.innerText = 0;
	output.classList.remove("result-small");
}
