let firstOperand = ''
let operator = ''
let secondOperand = ''
let result = ''

const buttons = document.querySelectorAll('button')

const clickButton = () => {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('operand'))
                inputOperand(button.textContent)
            else if (button.classList.contains('operator'))
                inputOperator(button.textContent)
            else if (button.classList.contains('clear'))
                clearDisplay()
            else if (button.classList.contains('undo'))
                undo()
            else if (button.classList.contains('equals'))
                inputEquals()
            else if (button.classList.contains('sign'))
                inputSign()
            else if (button.classList.contains('percent'))
                inputPercent()
            else if (button.classList.contains('decimal'))
                inputDecimal()
            updateDisplay()
        })
    })
}

clickButton()

const pressButton = () => {
    document.addEventListener('keydown', (e) => {
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key))
            inputOperand(e.key)
        else if (['+', '-', '/', '*'].includes(e.key))
            inputOperator(e.key)
        else if (e.key.toLowerCase() === 'c')
            clearDisplay()
        else if (e.key === 'Backspace')
            undo()
        else if (e.key === '=' || e.key === 'Enter')
            inputEquals()
        else if (e.key.toLowerCase() === 's')
            inputSign()
        else if (e.key.toLowerCase() === '%')
            inputPercent()
        else if (e.key.toLowerCase() === '.')
            inputDecimal()
        updateDisplay()
    })
}

pressButton()

const updateDisplay = () => {
    const upperExp = document.getElementById('upperExp')
    const lowerExp = document.getElementById('lowerExp')
    const solution = document.getElementById('result')
    upperExp.textContent = firstOperand
    lowerExp.textContent = operator + ' ' + secondOperand
    if (secondOperand !== '')
        result = approximate(operate(parseFloat(firstOperand), operator, parseFloat(secondOperand)).toString())
    else
        result = ''
    solution.textContent = result
}

const inputOperand = (value) => {
    if (operator === '' && firstOperand.split('').filter(char => /\d/.test(char)).length < 15) {
        if (firstOperand.startsWith('0') && !firstOperand.includes('.'))
            firstOperand = ''
        firstOperand += value
    }
    else if (operator !== '' && secondOperand.split('').filter(char => /\d/.test(char)).length < 15) {
        if (secondOperand.startsWith('0') && !secondOperand.includes('.'))
            secondOperand = ''
        secondOperand += value
    }
}

const inputOperator = (value) => {
    if (firstOperand !== '' && secondOperand === '')
        operator = value
    else if (secondOperand !== '') {
        inputEquals()
        operator = value
    }
}

const undo = () => {
    if (operator === '')
        firstOperand = firstOperand.slice(0, -1)
    else if (secondOperand !== '')
        secondOperand = secondOperand.slice(0, -1)
    else
        operator = ''
    if (firstOperand === '-') 
        firstOperand = ''
    if (secondOperand === '-') 
        secondOperand = ''
}

const clearDisplay = () => {
    firstOperand = ''
    operator = ''
    secondOperand = ''
    result = ''
}

const inputEquals = () => {
    if (!['', 'Infinity', '-Infinity' 'rly? <_<'].includes(result)) {
        let answer = result
        clearDisplay()
        firstOperand = answer.toString()
    }
}

const inputSign = () => {
    if (operator === '' && firstOperand !== '' && firstOperand != 0)
        if (firstOperand.startsWith('-'))
            firstOperand = firstOperand.slice(1)
        else
            firstOperand = '-' + firstOperand
    else if (operator !== '' && secondOperand !== '' && secondOperand != 0)
        if (secondOperand.startsWith('-'))
            secondOperand = secondOperand.slice(1)
        else
            secondOperand = '-' + secondOperand
}

const inputPercent = () => {
    if (operator === '' && firstOperand !== '') {
        firstOperand /= 100
        firstOperand = approximate(firstOperand.toString())
    }
    else if (operator !== '' && secondOperand !== '') {
        secondOperand /= 100
        secondOperand = approximate(secondOperand.toString())
    }
}

const inputDecimal = () => {
    if (operator === '' && firstOperand !== '' && !firstOperand.includes('.'))
        firstOperand += '.'
    else if (operator !== '' && secondOperand !== '' && !secondOperand.includes('.'))
        secondOperand += '.'
}

const operate = (a, op, b) => {
    if (op === '+') 
        return a + b
    else if (op === '-') 
        return a - b
    else if (op === '*') 
        return a * b
    else if (op === '/') 
        return b != 0 ? a / b : 'rly? <_<'
}

const approximate = (number) => {
    if (number.includes('e')) 
        return parseFloat(number).toPrecision(10)
    else if (number.includes('.')) {
        let [integer, fraction] = number.split('.')
        if (integer.length >= 15)
            return number.slice(0, 15)
        else
            return `${integer}.${fraction.slice(0, 15 - integer.length)}`
    }
    return number.slice(0, 15)
}
