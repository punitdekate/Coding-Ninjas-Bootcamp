// Please don't change the pre-written code
// Import the necessary modules here
const file = require('fs');
const Solution = () => {
    // Write your code here
    file.writeFileSync('notes.txt', "The world has enough coders");
    let buffer = file.readFileSync("notes.txt", "utf8");
    console.log(buffer);
    file.appendFileSync('notes.txt', "BE A CODING NINJA!");
    let updatedBuffer = file.readFileSync("notes.txt", "utf8");
    console.log(updatedBuffer);
    file.unlinkSync('notes.txt');
};
Solution();
module.exports = Solution;