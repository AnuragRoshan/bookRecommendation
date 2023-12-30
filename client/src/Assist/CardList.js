function splitNumbers(inputString) {
    // Split the input string into an array of substrings using space as the delimiter
    const numbersArray = inputString.split(' ');

    // Convert each element of the array to a number
    const number1 = parseInt(numbersArray[0]);
    const number2 = parseInt(numbersArray[1]);

    // Return an object containing the two numbers
    return {
        number1,
        number2
    };
}

module.exports = splitNumbers;
