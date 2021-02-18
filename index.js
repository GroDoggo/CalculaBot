const fs = require("fs");
const calculaBot = require("./dependencies/calculaBot/calculaBot.js");

var tokenC = fs.readFileSync('tokenC.txt', 'utf8');

calculaBot.login(tokenC);