const calculator = document.querySelector(".calc");
const buttons = document.querySelector(".calc__body");
const output = document.querySelector(".calc__result");
const text = document.querySelector(".calc__text");
const title = document.querySelector(".calc__title");
const equal = document.querySelector("#btn-equal");
const clear = document.querySelector("#btn-clear");

var firstOperand = "";
var secondOperand = "";
var result = 0;
var operator = undefined;
var decimal = false;
var danger = false;
var maxLength = 10;

addEvents();

function addEvents() {
	buttons.addEventListener("click", displayData);
	equal.addEventListener("click", calculate);
	clear.addEventListener("click", clearAll);
}

function removeEvents() {
	buttons.removeEventListener("click", displayData);
	equal.removeEventListener("click", calculate);
	clear.removeEventListener("click", clearAll);
}

function displayData(e) {
	let btn = e.target;
	if (btn.className.includes("num")) {
		if (!operator) {
			if (result) {
				clearAll();
			}
			if (btn.innerText === "." && decimal) return;
			if (btn.innerText === ".") decimal = true;
			firstOperand += btn.innerText;
			if (firstOperand === ".") firstOperand = "0.";
			output.innerText = firstOperand;
			lengthCheck(firstOperand);
		} else {
			if (btn.innerText === "." && decimal) return;
			if (btn.innerText === ".") decimal = true;
			secondOperand += btn.innerText;
			if (secondOperand === ".") secondOperand = "0.";
			text.innerText = `${firstOperand} ${operator}`;
			output.innerText = secondOperand;
			lengthCheck(secondOperand);
		}
	} else if (btn.className.includes("op")) {
		if (firstOperand) {
			if (secondOperand) {
				calculate();
				if (danger) return;
			}
		} else {
			firstOperand = "0";
		}
		operator = btn.innerText;
		text.innerText = firstOperand;
		output.innerText = operator;
		decimal = false;
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
			if (secondNum === 0) danger = true;
		} else if (operator === "%") {
			result = firstNum % secondNum;
		} else if (operator === "^") {
			result = firstNum ** secondNum;
		}

		if (danger) {
			dangerAnimation();
			return;
		}

		result = result.toString();
		if (result.includes(".")) {
			result = Number(result).toFixed(2);
		}
		if (result.includes("e")) {
			result = Number(result).toPrecision(3);
		}

		text.innerText = `${firstOperand} ${operator} ${secondOperand}`;
		output.innerText = result;
		firstOperand = result;
		secondOperand = "";
		operator = undefined;
		decimal = false;
		lengthCheck(result);
	}
}

function clearAll() {
	firstOperand = "";
	secondOperand = "";
	operator = undefined;
	result = 0;
	decimal = false;
	danger = false;
	text.innerText = 0;
	output.innerText = 0;
	output.classList.remove("result-small");
	title.classList.remove("danger");
}

function lengthCheck(input) {
	if (input.length > maxLength) {
		output.classList.add("result-small");
	} else {
		output.classList.remove("result-small");
	}
}

function dangerAnimation() {
	let intervalID;
	removeEvents();
	text.innerText = "";
	output.innerText = "";
	intervalID = setInterval(() => {
		output.innerText += "😠";
		title.classList.toggle("danger");
	}, 150);
	calculator.classList.add("animate__hinge");
	calculator.addEventListener("animationend", () => {
		calculator.classList.remove("animate__hinge");
		clearInterval(intervalID);
		clearAll();
		addEvents();
	});
}
