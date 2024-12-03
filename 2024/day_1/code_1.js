import { input } from './input.js';

let leftValues = [];
let rightValues = [];
let distance = 0;
let inputStr = input;


var newValue = inputStr.split(/\s+/);

newValue.forEach(function(value, key) {
    if (key % 2) {
        rightValues.push(value); 
    } else {
        leftValues.push(value); 
    }
});

let newLeftValues = leftValues.sort();
let newRightValues = rightValues.sort();

newLeftValues.forEach(function(value, key) {
    distance += checkBigNumber(value, newRightValues[key]);
});

console.log(distance);

function checkBigNumber(x, y)
{
    if (x <= y) {
        return y - x;
    }
    return x - y;
}
