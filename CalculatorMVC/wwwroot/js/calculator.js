const previewDisplay = document.querySelector('.preview');
const operandDisplay = document.querySelector('.operand');
let currentOperand = '0';
let currentOperator = '';
let currentValue = '';

document.querySelectorAll('.btnNum').forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentOperand === '0') {
            currentOperand = '';
        }
        currentOperand += btn.textContent;
        updateDisplay();
    });
});

document.getElementById('btn0').addEventListener('click', () => {
    if (currentOperand !== '0' && !currentOperand.includes('.')) {
        currentOperand += '0';
    } else if (currentOperand.includes('.')) {
        currentOperand += '0';
    }
    updateDisplay();
});

document.getElementById('btnDot').addEventListener('click', () => {
    if (currentOperand === '') {
        currentOperand = '0';
    }
    if (!currentOperand.includes('.')) {
        currentOperand += '.';
    }
    updateDisplay();
});

document.getElementById('btnC').addEventListener('click', () => {
    clearValues();
});

document.getElementById('btnCE').addEventListener('click', () => {
    currentOperand = '0';
    updateDisplay();
});

document.getElementById('btnEquals').addEventListener('click', () => {
    if (currentValue !== '' && currentOperator !== '' && currentOperand !== '') {
        submitCalculation();
    }
});

document.getElementById('btnPlus').addEventListener('click', () => {
    updateValues('+');
});

document.getElementById('btnMultiply').addEventListener('click', () => {
    updateValues('*');
});

document.getElementById('btnDivide').addEventListener('click', () => {
    updateValues('/');
});

document.getElementById('btnMinus').addEventListener('click', () => {
    updateValues('-');
});

function updateValues(operator) {
    if (currentValue === '') {
        currentValue = currentOperand;
        currentOperand = ''
    }
    currentOperator = operator;
    updateDisplay();
}

function updateDisplay() {
    if (currentOperand.length > 18) {
        displayedOperandValue = currentOperand.substring(0, 18);
    } else {
        displayedOperandValue = currentOperand;
    }
    if (currentValue.length > 18) {
        displayedCurrentvalue = currentValue.substring(0, 18);
    } else {
        displayedCurrentvalue = currentValue;
    }

    previewDisplay.textContent = displayedCurrentvalue + ' ' + currentOperator;
    operandDisplay.textContent = displayedOperandValue;
}

function clearValues() {
    currentOperand = '0';
    currentOperator = '';
    currentValue = '';
    updateDisplay();
}

function submitCalculation() {
    const data = {
        Action: currentOperator,
        CurrentValue: parseFloat(currentValue),
        Operand: parseFloat(currentOperand)
    };

    fetch('/Calculator/Calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    if (errorData && typeof errorData === 'object') {
                        let errorMessage = '';
                        for (const key in errorData) {
                            if (errorData.hasOwnProperty(key)) {
                                errorMessage += ` ${errorData[key].join(', ')}`;
                            }
                        }
                        throw new Error(errorMessage);
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.hasOwnProperty('value')) {
                clearValues();
                const errorMessage = document.querySelector('.error-message');
                errorMessage.textContent = '';
                errorMessage.style.display = 'none';
                currentOperand = data.value;
                updateDisplay();
            } else {
                throw new Error('Response does not contain the expected "value" key.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            const errorMessage = document.querySelector('.error-message');
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        });
}