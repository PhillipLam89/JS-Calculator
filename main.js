const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const toggleNegativeButton = document.querySelector('[data-toggle-negative]')



numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.className === 'span-two sqrt') {
      calculator.chooseOperation('√')
      calculator.updateDisplay()
      return
    } else {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    }

  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})


toggleNegativeButton.addEventListener('click', button => {
  calculator.handleToggleNegative()
})


class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    let squareRooted = ''
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return //these operations require 2 arguments
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      case '^':
        computation = prev ** current
        break
      case '√':
        computation = Math.pow(current, 1 / prev)
        break
      default:
        return
    }

    this.currentOperand = computation.toString()
    this.operation = undefined
    this.previousOperand = ''
  }


  handleCommas(number) {
    let finalAnswer = number.toString().split('.'); //prevents placing commas after decimal point
    finalAnswer[0] = finalAnswer[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); //adds commas ONLY for integers LEFT of decimal
    return finalAnswer.join('.'); //returns answer with commas on left of decimals where appropriate
  }

  handleToggleNegative(number) {
    if (currentOperandTextElement.innerText === '' || this.currentOperand === '') return

    this.currentOperand = this.currentOperandTextElement.innerText * -1
    this.currentOperandTextElement.innerText = this.currentOperandTextElement.innerText * -1

  }

  updateDisplay() {

    this.currentOperandTextElement.innerText = this.handleCommas(this.currentOperand)

    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.handleCommas(this.previousOperand)}${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
