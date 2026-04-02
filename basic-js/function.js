//Create a function to display numbers from 1 to 100
function displayOneToHundred(){
    for(let i=0;i<=100;i++){
        console.log(i);
    }
}
displayOneToHundred();

// Create a function to display today's date in DD/MM/YYYY format
function displayCurrentDate(){
    const date=new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    console.log(`${day}/${month}/${year}`);
}
displayCurrentDate();

//Create a function which accepts a Celsius value as parameter and returns the Fahrenheit value
function convertCelsiusToFarenheit(celsius){
    return (celsius*9)/5+32;
}

const celsiusValue = 25;
console.log(
	`The celsius value of ${celsiusValue} degree  in fahrenheit is ${convertCelsiusToFarenheit(celsiusValue)}`,
);

// Create a function which accepts an array of numbers as parameter and return the average of those numbers.
function getAverageOfNumbers(numbers)
{
    let sum=numbers.reduce(function(total,num){
        return total+num;
    })
    return sum/numbers.length;
}
numberArray=[10, 20, 30, 40];
console.log("The average of the array is "+ getAverageOfNumbers(numberArray)); 

// Create a function to reverse a given string.
function getReverseString(originalString){
    return originalString.split('').reverse().join('');
}
originalString="hello world";
console.log(`The ${originalString} reversed is ${getReverseString(originalString)}`);