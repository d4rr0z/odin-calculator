let num1 = null;
let op = null;
let num2 = null;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (a, op, b) => {
    if (op === '+') return add(a, b);
    else if (op === '-') return subtract(a, b);
    else if (op === '*') return multiply(a, b);
    else if (op === '/') return divide(a, b);
}