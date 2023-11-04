
const { odd, even } = require('../module_study/var'); // exports 한 것중에 가져올 js 파일의 경로를 불러옴
// const {odd, even } <-- 구조 분해 할당 문법이다 (추가 공부가 필요할듯.. 헛;;)

function checkOddorEven(num) {
    if(num % 2){
        return odd;
    }
    return even;
}

module.exports = checkOddorEven; // module.exports에 객체 뿐만아니라 함수와 변수 둘 다 대입할 수 있다. 