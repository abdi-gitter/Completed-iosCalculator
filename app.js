// references to elements:

// primary display:
const primaryDisplay = document.querySelector('.primary-display')

// secondary display:
const secondaryDisplay = document.querySelector('.secondary-display')

// buttons:
const buttons = document.querySelector('.buttons-container')

// other variables:
let firstNumber = ''
// store last operator clicked:
let operator = ''
// This variable will tell us if the previous key pressed was an operator or not.
let isPreviousKeyOperator = false

// calculate:
const calculate = () => {
    switch (operator) {
        case '+':
            return Number(firstNumber) + Number(primaryDisplay.textContent);
        case '-':
            return Number(firstNumber) - Number(primaryDisplay.textContent);
        case 'x':
            return Number(firstNumber) * Number(primaryDisplay.textContent);
        case '÷':
            return Number(firstNumber) / Number(primaryDisplay.textContent);
        case '%':
            // return Number(firstNumber) % Number(primaryDisplay.textContent);
            // primary / 100 * secondary
            // secondary * primary / 100
            return Number(primaryDisplay.textContent) * Number(firstNumber) / 100;
    }
}

// event listener for buttons:
buttons.addEventListener('click', (e) => {
    if (!e.target.classList.contains('button')) {
        return
    }

    let primaryValue = primaryDisplay.textContent
    let buttonValue = e.target.textContent

    console.log(e.target.textContent)

    // clear button:
    if (e.target.classList.contains('ac')) {
        primaryDisplay.textContent = '0'
        secondaryDisplay.textContent = ''
    }

    // enter numbers:
    if (e.target.classList.contains('number')) {
        if (primaryValue.length < 7) {
            // primaryDisplay.textContent += e.target.textContent
            if (primaryValue !== '0') {
                primaryDisplay.textContent += buttonValue
            } else if (buttonValue !== '0') {
                primaryDisplay.textContent = buttonValue
            }
        }
    }

    // decimal:
    if (e.target.classList.contains('decimal')) {
        if (!primaryValue.includes('.')) {
            primaryDisplay.textContent += '.'
        }
    }

    // -------------------------------------------------------------------
    // ------------------------- CHALLENGING PART ------------------------
    // -------------------------------------------------------------------

    // operators:
    if (e.target.classList.contains('operator')) {
        console.log('operator clicked! ' + buttonValue)

        if (!isPreviousKeyOperator) {
            if (secondaryDisplay.textContent && operator) {
                firstNumber = calculate()
            } else {
                firstNumber = primaryValue
            }
            primaryDisplay.textContent = '0'
        }

        operator = buttonValue
        secondaryDisplay.textContent = `${firstNumber} ${operator}`
        isPreviousKeyOperator = true
    } else {
        isPreviousKeyOperator = false
    }

    // euqals button:
    if (e.target.classList.contains('equal')) {
        if (secondaryDisplay.textContent && operator && !isPreviousKeyOperator && primaryValue) {
            secondaryDisplay.textContent = calculate()
            firstNumber = calculate()
            primaryDisplay.textContent = '0'
            operator = ''
            isPreviousKeyOperator = true
        }
    }

    // -------------------------------------------------------------------
    // --------------------- END CHALLENGING PART ------------------------
    // -------------------------------------------------------------------
    

    // +/- button:
    if (e.target.classList.contains('pm')) {
        if(primaryValue[0]=='-'){
            primaryDisplay.textContent = primaryValue.substring(1)
        } else if (primaryValue!=='0'){
            primaryDisplay.textContent = '-' + primaryValue
        }
    }


})