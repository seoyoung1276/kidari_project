console.log('require가 가장 위에 오지 않아도 됩니다.');

module.exports = '저를 찾아보세요.';

require('../module_study/var');

console.log('require.cache 입니다.');
console.log(require.cache);
console.log('require.main 입니다.');
console.log(require.main === module); // 첫 실행시의 모듈을 가리킨다 
console.log(require.main.filename);

// 가장 중요한 것 !!!! ✨
// require가 반드시 파일 최상단에 위치할 필요 없고 
// module.exports 도 반드시 최하위에 있어야 하지 않는다! 
// 아무곳에서나 사용 가능