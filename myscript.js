const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
//const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
//const previousOperandTextElement = document.querySelector('[data-previous-operand]');
//const currentOperandTextElement = document.querySelector('[data-current-operand]');
let display = document.querySelector('[display]');
let memoryCurrentNumber = '0';
let memoryNewNumber = false;
let memoryPendingOperation = '';


for(let i = 0; i < numberButtons.length; i++){
    let numbers = numberButtons[i];
    numbers.addEventListener('click', function(e){
        pressNumber(e.target.innerText);
    });
};

for(let i = 0; i < operationButtons.length; i++){
    let operations = operationButtons[i];
    operations.addEventListener('click', function(e){
        pressOperation(e.target.innerText);
    });
};

equalsButton.addEventListener('click', pressEqual);
    
deleteButton.addEventListener('click', pressDelete);

allClearButton.addEventListener('click', pressClear);



function pressNumber(num) {
    if(memoryNewNumber){
       display.value = num;
       memoryNewNumber = false;
    }else{
        if(display.value === ''){
            display.value = num;
        }else{
            display.value += num; 
        };
    };
};

function pressOperation(action) {
    const localOperationMemory = display.value;

    if(memoryNewNumber && memoryPendingOperation !== '='){
        display.value = memoryCurrentNumber;
    }else{
        memoryNewNumber = true;
        switch(memoryPendingOperation){
            case '+':
                memoryCurrentNumber += parseFloat(localOperationMemory);
                break;

            case '-':
                memoryCurrentNumber -= parseFloat(localOperationMemory);
                break;
                
            case '*':
                memoryCurrentNumber *= parseFloat(localOperationMemory);
                break;
                
            case '÷':
                memoryCurrentNumber /= parseFloat(localOperationMemory);
                break;    
            case '=':
                memoryCurrentNumber = parseFloat(localOperationMemory);    
        };
        display.value = memoryCurrentNumber;
        memoryPendingOperation = action;
    };
    console.log(`Click operation button ${symbol}`);
};

function pressEqual(params) {
    console.log('Click equals button!');
};

function pressDelete(params) {
    console.log('Click delete button!');
};

function pressClear (params) {
    console.log('Click clear all button!');
};
