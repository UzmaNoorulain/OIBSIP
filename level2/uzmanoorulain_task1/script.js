const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

let expression = "";

function updateDisplay() {
    expressionDisplay.textContent = expression;
}

function evaluateExpression() {

    if (expression === "") return;

    try {

        if (/\/0(?!\d)/.test(expression)) {
            throw Error("Division by zero");
        }

        const result = Function("return " + expression)();

        if (!isFinite(result)) {
            throw Error("Math Error");
        }

        resultDisplay.textContent = result;
        expression = result.toString();

    } catch {

        resultDisplay.textContent = "Error";
        expression = "";

    }

    updateDisplay();
}

document.querySelectorAll(".number").forEach(button => {

    button.addEventListener("click", () => {

        expression += button.textContent;
        updateDisplay();

    });

});

document.querySelector(".decimal").addEventListener("click", () => {

    const lastNumber = expression.split(/[\+\-\*\/]/).pop();

    if (!lastNumber.includes(".")) {

        if (lastNumber === "") {
            expression += "0.";
        } else {
            expression += ".";
        }

    }

    updateDisplay();

});

document.querySelectorAll(".operator").forEach(button => {

    button.addEventListener("click", () => {

        if (expression === "") return;

        if (/[\+\-\*\/]$/.test(expression)) {

            expression =
                expression.slice(0,-1) + button.textContent;

        } else {

            expression += button.textContent;

        }

        updateDisplay();

    });

});

document.querySelector(".clear").addEventListener("click", () => {

    expression = "";
    resultDisplay.textContent = "0";
    updateDisplay();

});

document.querySelector(".backspace").addEventListener("click", () => {

    expression = expression.slice(0,-1);
    updateDisplay();

});

document.querySelector(".equals").addEventListener("click", evaluateExpression);

document.addEventListener("keydown", (e) => {

    const key = e.key;

    if (!isNaN(key)) {

        expression += key;

    }

    else if (["+", "-", "*", "/"].includes(key)) {

        if (expression !== "") {

            if (/[\+\-\*\/]$/.test(expression)) {
                expression =
                    expression.slice(0,-1) + key;
            } else {
                expression += key;
            }

        }

    }

    else if (key === ".") {

        const lastNumber = expression.split(/[\+\-\*\/]/).pop();

        if (!lastNumber.includes(".")) {

            if (lastNumber === "") {
                expression += "0.";
            } else {
                expression += ".";
            }

        }

    }

    else if (key === "Backspace") {

        expression = expression.slice(0,-1);

    }

    else if (key === "Escape") {

        expression = "";
        resultDisplay.textContent = "0";

    }

    else if (key === "Enter" || key === "=") {

        evaluateExpression();
        return;

    }

    updateDisplay();

});

updateDisplay();