import { input } from './input.js';

let inputStr = input;

const lines = inputStr.split('\n');

let safeCtr = 0;
let unsafeCtr = 0;
let tempRemove = [];
let tempRemoveCtr = 0;

lines.forEach(function(str) {
    let level = str.split(/\s+/);
    checkSafety(level);
});

function checkSafety(data, checkCounts = true)
{
    let isResult = '';
    let tempSign = [];
    let tempData = data;
    let calcResults = [];

    for (let nextCtr = 1; nextCtr < tempData.length; nextCtr++) {
        let calc = tempData[nextCtr - 1] - tempData[nextCtr];

        calcResults.push(Math.abs(calc));

        let sign = calc > 0 ? "decrease" : calc < 0 ? "increase" : "zero";

        if (!checkCounts) {
            console.log([ tempData[nextCtr - 1],  tempData[nextCtr]], ' = ' + calc, ' : ' + sign);
        }

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
    }
    
    if ('zero' in itemCounts) {
        isValid = false;
    }
    
    if (calcResults.some(num => num >= 4)) {
        isValid = false;
    }
    
    if (signResultCount == 2) {
        isValid = false;
    }

    // console.log(checkCounts);

    if (checkCounts && signResultCount == 2 && (itemCounts['decrease'] == 1 || itemCounts['increase'] == 1 || itemCounts['zero'] == 1))
    {
        let keyValue = '';
        if (itemCounts['decrease'] == 1) { keyValue = 'decrease'; }
        if (itemCounts['increase'] == 1) { keyValue = 'increase'; }
        if (itemCounts['zero'] == 1) { keyValue = 'zero'; }

        let index = tempSign.indexOf(keyValue);
        if (index !== -1) {
            tempData.splice(index, 1);
            tempRemove.push(tempData);
            tempRemoveCtr++;
            return;
        }
    }
    
    if (!checkCounts) {

        console.log('safe:', isValid, 'items:', itemCounts);

        console.log('------------------------------------------------');
    }

    isValid ? safeCtr++ : unsafeCtr++;
}

tempRemove.forEach(function(level) {
    checkSafety(level, false);
});

console.log({
    remove_count: tempRemoveCtr,
    safe: safeCtr,
    unsafe: unsafeCtr
});
