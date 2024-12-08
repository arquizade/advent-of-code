import { input } from './input.js';

let inputStr = input;

const lines = inputStr.split('\n');

let safeCtr = 0;
let unsafeCtr = 0;

lines.forEach(function(str) {
    let level = str.split(/\s+/);
    checkSafety(level);
});

function checkSafety(data)
{
    let isResult = '';
    let compA = 0;
    let compB = 0;
    for (let nextCtr = 1; nextCtr < data.length; nextCtr++) {
        let calc = data[nextCtr - 1] - data[nextCtr];
        let newCalcVal = Math.abs(calc);

        compA = compA + calc;
        compB = compB + newCalcVal;

        if (newCalcVal !== 0 && newCalcVal <= 3) {
            isResult = 'safe';
        } else {
            isResult = 'unsafe';
            break;
        }
    }

    if ((Math.abs(compA) - Math.abs(compB)) !== 0) {
        isResult = 'unsafe';
    }

    isResult === 'safe' ? safeCtr++ : unsafeCtr++;
}

console.log({
    safe: safeCtr,
    unsafe: unsafeCtr
});
