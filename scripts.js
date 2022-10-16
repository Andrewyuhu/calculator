
let numberArray = [];
const upperDisplay = document.querySelector(".upperDisplay");
const lowerDisplay = document.querySelector(".lowerDisplay");
let valueA;
let valueB;
let answer;
let currentOperator;
let nextOperator;


initilizeCalculator();

function initilizeCalculator() {
    const calcButtonValue = document.querySelectorAll(".calcButton.value");
    const calcButtonOperator = document.querySelectorAll(".calcButton.operatorButton");
    const clearVal = document.querySelector('.clear');
    const deleteVal = document.querySelector('.delete');
    calcButtonOperator.forEach((button) => 
    (button.addEventListener('click', operatorHandler )));

    calcButtonValue.forEach((button) => {
        button.addEventListener('click', () => {
            numberArray.push(button.getAttribute('data-value'));
            lowerDisplay.textContent = `${numberArray.join('')}`;
        });
    });

    clearVal.addEventListener('click', ()=>{
        currentOperator = null;
        nextOperator = null;
        valueA = null;
        valueB = null;
        lowerDisplay.textContent = '';
        upperDisplay.textContent = '';
    });

    deleteVal.addEventListener('click', ()=> {
        numberArray.pop();
        lowerDisplay.textContent = `${numberArray.join('')}`;
    });

}


function operatorHandler (e) {
    const button = e.target;
    

    // If there is no current operator and first value
    if (!(currentOperator) && (!valueA)) {
        valueA = +numberArray.join('');
        numberArray = [];
        currentOperator = e.target.getAttribute('data-operator');
        upperDisplay.textContent = `${valueA} ${currentOperator}`;
        lowerDisplay.textContent = '';
        return;

    // If there is no current operator
    } else if (!(currentOperator)){

        // If number array is populated, while valueA is full and operator is empty
        // This means are answer was computed previously, overwrite previous answer 
        // in this case
        if (numberArray.length > 0){
            valueA = +numberArray.join('');
            numberArray = [];
        }
        // If no value B is detected and equation symbol detected
        // print out value A
        if (e.target.getAttribute('data-operator') == "=" ){
            answer = valueA;
            upperDisplay.textContent = `= ${valueA}`;
            return;
        }
        currentOperator = e.target.getAttribute('data-operator');
        upperDisplay.textContent = `${valueA} ${currentOperator}`;
        lowerDisplay.textContent = '';
        return;
    } 

    // If there is a current operator and first value, compile second value
    if (currentOperator && (valueA || valueA == 0)) {

        // If number array has no values, overwrite the pervious operator
        if (numberArray.length < 1) {
            currentOperator = e.target.getAttribute('data-operator');
            upperDisplay.textContent = `${valueA} ${currentOperator}`;
            lowerDisplay.textContent = '';
            return;

        // If number array has values, then join the second value and
        // determine an answer
        } else {
            valueB = +numberArray.join('');
            upperDisplay.textContent= `${valueA} ${currentOperator} ${valueB}` ;
            nextOperator = e.target.getAttribute('data-operator');
            numberArray = [];

            determineAnswer();
        }
        
    }

function determineAnswer () {
    switch(true){
        case (currentOperator == '+'):
            addValues();
            break;
        case (currentOperator == "-"):
            subtractValues();
            break;
        case (currentOperator == "/"):
            divideValues();
            break;
        case (currentOperator == "x"):
            multiplyValues();
            break;
    }
    
    if (nextOperator == "="){
        lowerDisplay.textContent = `${answer}`;
        nextOperator = null;
        currentOperator = null;
    } else {
        upperDisplay.textContent = `${answer + nextOperator}`
        lowerDisplay.textContent = `${answer}`;
        currentOperator = nextOperator;
        nextOperator = null;
    }
    valueA = answer == "ERROR" ? null : answer
    valueB = null;
}

function addValues() {
    answer = valueA + valueB;

}

function subtractValues() {
    answer = valueA - valueB;

}

function divideValues() {
    if (valueB == 0){
        answer = "ERROR"
        return;
    }
    answer = valueA / valueB;

}

function multiplyValues() {
    answer = valueA * valueB;

}






}





function addValues(){
    console.log(valueA + valueB);
    return valueA + valueB;
}
