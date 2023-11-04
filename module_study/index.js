// index 파일에서는 var.js 와 func.js 파일 모두를 참조한다. 
const { odd, even } = require('../module_study/var');
const checkNumber = require('../module_study/func');

function checkStringOddorEven(str){
    if(str.length % 2){
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddorEven('hello'));