

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const toggleNegativeButton = document.querySelector('[data-toggle-negative]')
const piButton = document.querySelector('[data-pi]')
const sqrButton = document.querySelector('.sqrt')

let havePi = false
let pi = 3.14159

numberButtons.forEach(button => {
  button.addEventListener('click', () => {

    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})




function operationButtonsDefault() {
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {

      if (button.id === 'sqrt') {

        calculator.chooseOperation('√')
        calculator.updateDisplay()
        return
      } else {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
      }

    })
  })
}
operationButtonsDefault()

equalsButton.addEventListener('click', button => {
  if (havePi) {
    calculator.computePi()
  } else {
    calculator.compute()
  }

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

  computePi() {
    let computation
    if (!this.currentOperand.includes('π')) {
      this.compute()
      this.updateDisplay()
      return
    }

    if (this.currentOperand.includes('π') && havePi || havePi) {

      if (this.operation === '+' && this.currentOperand.includes('π')) {

          computation = this.currentOperand.length > 1 ? Number(this.previousOperand) + Number(this.currentOperand.slice(0, this.currentOperand.length - 1)) * pi : Number(this.previousOperand) + pi
        }
      else if (this.operation === '-' && this.currentOperand.includes('π')) {
          computation = this.currentOperand.length > 1 ? Number(this.previousOperand) - Number(this.currentOperand.slice(0, this.currentOperand.length - 1)) * pi : Number(this.previousOperand) - pi
        }
      else if (this.operation === '*' && this.currentOperand.includes('π')) {
          computation = this.currentOperand.length > 1 ? Number(this.previousOperand) * Number(this.currentOperand.slice(0, this.currentOperand.length - 1)) * pi : Number(this.previousOperand) * pi

        }
      else if (this.operation === '÷' && this.currentOperand.includes('π')) {
          computation = this.currentOperand.length > 1 ? Number(this.previousOperand) / (Number(this.currentOperand.slice(0, this.currentOperand.length - 1)) * pi) : Number(this.previousOperand) / pi
        }
      else if (this.operation === '^' && this.currentOperand.includes('π')) {
          computation = this.currentOperand.length > 1 ? Number(this.previousOperand) ** (Number(this.currentOperand.slice(0, this.currentOperand.length - 1)) * pi) : Number(this.previousOperand) ** pi

        }
      else if (this.operation === '√' && this.currentOperand.includes('π')) {
          console.log('i ran')
          computation = this.currentOperand.length > 1 ? Math.pow(Number(this.currentOperand * pi) , (1 / Number(this.previousOperand))) : Math.pow(Number(this.currentOperand), 1 / pi)
        }
    }



    this.currentOperand = computation.toString()
    this.operation = undefined
    this.previousOperand = ''
  }

  clear() {
    havePi = false
    operationButtons.forEach(button => {

      if (button.className.includes('pi-added')) {
        button.className = ''
      }
      //   if (button.className.includes('pi-added')) {
      //       button.className = ''
      // }

    })

    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    if (number === 'π' && this.currentOperand.includes('π')) return
    this.currentOperand = this.currentOperand.toString() + number
  }

  chooseOperation(operation) {

    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.operation = operation

      this.compute()
    }
    this.operation = operation
    if (this.currentOperand.includes('π') && havePi) {
      if (this.currentOperand === 'π') {

        this.previousOperand = pi
        this.currentOperand = ''

      }
      else if (this.operation === '*' && !this.previousOperand.includes('*')) {
        this.previousOperand = this.currentOperand.slice(0, this.currentOperand.length - 1) * pi

        this.currentOperand = ''
      }

      else if (this.operation === '+' || this.operation === '-' || this.operation === '÷' || this.operation === '^' || this.operation === '√') {
        this.previousOperand = Number(this.currentOperand.slice(0, this.currentOperand.length - 1)) * pi
      }

    }

     else {
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }



    this.currentOperand = ''

  }

  compute() {
    let computation

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

  handlePi(expression) {
    let computation
    let prev
    let fullExpression = [this.operation, expression]


    var sliced = fullExpression[1].substring(0, fullExpression[1].length - 1);

    prev = Number(sliced) * 3.14159


    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) ) return //these operations require 2 arguments
    switch (this.operation) {
      case '+':
        computation = (prev * 3.14159) + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev + current
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

  updateDisplay() {
    if (this.currentOperand === 'Infinity' || this.currentOperand === 'NaN') {
      this.currentOperandTextElement.innerText = 'Undefined, please rail'
    }
    else {
      this.currentOperandTextElement.innerText = this.handleCommas(this.currentOperand)
    }


    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.handleCommas(this.previousOperand)}${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

piButton.addEventListener('click', button => {
  havePi = true
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.className += ' pi-added'

      if (button.className.includes('sqrt')) {
        calculator.chooseOperation('√')
      } else {
        calculator.chooseOperation(`${button.innerText}`)
      }

    })
  })

  calculator.appendNumber('π')

  calculator.updateDisplay()
})
