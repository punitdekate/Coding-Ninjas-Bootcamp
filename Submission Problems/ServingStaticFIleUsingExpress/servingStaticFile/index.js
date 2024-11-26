// Please don't change the pre-written code

const express = require("express");
const path = require('path');
const server = express();
// console.log(path.resolve('public'));


const renderStatic = () => {
    // Write your code here
    const resolPath = String(path.resolve('public'));
    server.use(express.static(resolPath));
};
server.get("/", (req, res) => {
    res.send("get method called!");
});

renderStatic();

module.exports = { renderStatic, server };