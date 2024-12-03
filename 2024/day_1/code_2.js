import { input } from './input.js';

let inputStr = input;

let leftValues = [];
let rightValues = [];
let similarityCtr = 0;

var newValue = inputStr.split(/\s+/);

newValue.forEach(function(value, key) {
    if (key % 2) {
        rightValues.push(value); 
    } else {
        leftValues.push(value); 
    }
});

const itemCounter = (value, index) => {
    return value.filter((x) => x == index).length;
};

leftValues.forEach(function(val) {
    similarityCtr += itemCounter(rightValues, val) * val;
});

console.log(similarityCtr);