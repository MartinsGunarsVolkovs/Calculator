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

