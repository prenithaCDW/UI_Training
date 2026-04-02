const readline = require("readline");

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//calculator object
const calculator = {
    addition: (num1, num2) => num1 + num2,
    subtraction: (num1, num2) => num1 - num2,
    multiplication: (num1, num2) => num1 * num2,
    division: (num1, num2) => {
        if (num1 === 0) return 0;
        else if (num2 === 0) return "Error. Cannot divide by zero";
        return num1 / num2;
    }
};

//get user input and implementation
reader.question("Enter first number: ", (num1) => {
    reader.question("Enter second number: ", (num2) => {
        reader.question("Choose operation (+,-,*,/): ", (operation) => {

            const number1 = Number(num1);
            const number2 = Number(num2);
            let result;

            if (isNaN(number1) || isNaN(number2 )) {
                console.log("Invalid input. Enter numbers");
            } else {
                switch (operation) {
                    case "+":
                        result = calculator.addition(number1,number2);
                        break;
                    case "-":
                        result = calculator.subtraction(number1,number2);
                        break;
                    case "*":
                        result = calculator.multiplication(number1,number2);
                        break;
                    case "/":
                        result = calculator.division(number1,number2);
                        break;
                    default:
                        result = "Invalid operation";
                }
                console.log("Result is " + result);
            }
            reader.close();
        });
    });
});