

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement  = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = null
  }

  delete() {

  }

  appendNumber(number) {

    if (number === '.' && this.currentOperand.includes('.')) return;

    this.currentOperand = this.currentOperand.toString() + number


  }

  chooseOperation(operation) {

  }

  compute() {

  }

  updateDisplay() {
      this.currentOperandTextElement.textContent = this.currentOperand
  }

}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// numberButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       calculator.appendNumber(button.textContent)
//       calculator.updateDisplay()
//     })
// })

// for (const buttons of numberButtons) {
//   buttons.addEventListener('click', () => {
//     calculator.appendNumber(buttons.textContent)
//     calculator.updateDisplay()
//   })
// }

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
    calculator.appendNumber(numberButtons[i].textContent)
    calculator.updateDisplay()
  })
}


for (const buttons of operationButtons) {
  buttons.addEventListener('click', () => {
    calculator.chooseOperation(buttons.textContent)
    calculator.updateDisplay()
  })
}
