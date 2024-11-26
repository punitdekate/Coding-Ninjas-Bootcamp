// Import required module
const readLine = require('readline');

const connector = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
const Solution = () => {
    // Write your code here
    connector.question("Enter the first number: ", (num1) => {
        connector.question("Enter the second number: ", (num2) => {
            const ans = Number(num1) > Number(num2) ? Number(num1) : Number(num2);
            console.log(`The maximum of the two number is: ${ans}`);
        })
    })
};

Solution();
module.exports = Solution;