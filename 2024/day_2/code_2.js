import { input } from './input.js';

let inputStr = input;

const lines = inputStr.split('\n');

let safeCtr = 0;
let unsafeCtr = 0;

lines.forEach(function(str) {
    let level = str.split(/\s+/);
    let tempCheckSafe = checkSafety(level);
    tempCheckSafe ? safeCtr++ : unsafeCtr++;
});

function isSafe(data)
{
    let tempSign = [];
    let tempData = data;
    let calcResults = [];

    for (let nextCtr = 1; nextCtr < tempData.length; nextCtr++) {
        let calc = tempData[nextCtr - 1] - tempData[nextCtr];

        calcResults.push(Math.abs(calc));

        let sign = calc > 0 ? "decrease" : calc < 0 ? "increase" : "zero";

        // console.log([ tempData[nextCtr - 1],  tempData[nextCtr]], ' = ' + calc, ' : ' + sign);

        tempSign.push(sign);
    }

    const itemCounts = {};

    tempSign.forEach(item => {
        itemCounts[item] = (itemCounts[item] || 0) + 1;
    });

    let isValid = true;

    let signResultCount = Object.keys(itemCounts).length;

    if (signResultCount > 2) {
        isValid = false;
    } else if ('zero' in itemCounts) {
        isValid = false;
    } else if (calcResults.some(num => num >= 4)) {
        isValid = false;
    } else if (signResultCount == 2) {
        isValid = false;
    }

    // console.log('safe:', isValid, 'items:', itemCounts);
    // console.log('------------------------------------------------');

    return isValid;
}

function checkSafety(level)
{
    if (isSafe(level)) {
        return true;
    }
    
    for (let i = 0; i < level.length; i++) {
        let newLevel = [...level.slice(0, i), ...level.slice(i + 1)];
        if (isSafe(newLevel)) {
            return true;
        }
    }

    return false;
}

console.log({
    safe: safeCtr,
    unsafe: unsafeCtr
});
