const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelectorAll('[data-clear]');
const resultButton = document.querySelector('[data-result]');
const decimalButton = document.querySelector('[data-decimal]');
const display = document.querySelector('[display]');
let memoCurrentNumber = 0;
let memoNewNumber = false;
let memoPendingOperation = '';




for (let i = 0; i < numberButton.length; i++) {
    const number = numberButton[i];
    number.addEventListener('click', function (e) {
        pressNumber(e.target.innerText);
    });
};

for (let i = 0; i < operationButton.length; i++) {
    const operation = operationButton[i];
    operation.addEventListener('click', function(e) {
        pressOperation(e.target.innerText);
    });
    
};

for (let i = 0; i < clearButton.length; i++) {
    const clear = clearButton[i];
    clear.addEventListener('click', function(e) {
        pressClear(e.target.innerText);
    });
};

decimalButton.addEventListener('click', pressDecimal);


function pressNumber(num) {
    if (memoNewNumber) {
         display.value = num;
         memoNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = num;
        } else {
            display.value += num; 
        }; 
    };
};

function pressOperation(symb) {
    let localOperationMemory = display.value;

    if (memoNewNumber && memoPendingOperation !== '=') {
        display.value = memoCurrentNumber;
    } else {
        memoNewNumber = true;
        if (memoPendingOperation === '+') {
            memoCurrentNumber += parseFloat(localOperationMemory);
        } else if(memoPendingOperation === '-'){
            memoCurrentNumber -= parseFloat(localOperationMemory);
        } else if(memoPendingOperation === '*'){
            memoCurrentNumber *= parseFloat(localOperationMemory);
        } else if(memoPendingOperation === '÷'){
            memoCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            memoCurrentNumber = parseFloat(localOperationMemory);
        };
        display.value = memoCurrentNumber;
        memoPendingOperation = symb;
    }
};

function pressClear(id) {
    if (id === 'DEL') {
        let string = display.value.toString();
        if(string.length === 1){
            display.value = '0';
        }else{
            display.value = string.slice(0, -1);
        }
    } else if(id === 'AC'){
        display.value = '0';
        memoNewNumber = true;
        memoCurrentNumber = '0';
        memoPendingOperation = '';
    };
};

function pressDecimal(params) {
    let localDecimalMemory = display.value;

    if(memoNewNumber){
        localDecimalMemory = '0.';
        memoNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf('.') === -1){
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
};

