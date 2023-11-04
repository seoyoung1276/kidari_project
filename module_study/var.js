// 변수를 두 개 선언 해당 변수들을 exports 했기 때문에 변수들을 모아둔 모듈이 됨!

const odd = 'CJS 홀수입니다';
const even = 'CJS 짝수입니다';

module.exports = {
    odd,
    even,
};

// exports.odd = 'CJS 짝수입니다' <-- 해당 방식으로도 모듈 exports 가능
// exports 유의사항
// exports는 module.exports와 참조 관계이다 (exports가 먼저) 
// exports는 반드시 객체처럼 속성명과 속성값을 대입해야 한다. 다른 값ㅇ르 대입하면 객체의 참조 관계가 끊긴다. 
// 참조 관계가 있으므로 한 모듈에 exports 객체와 module.exports를 동시에 사용하지 않는 것이 좋다. 