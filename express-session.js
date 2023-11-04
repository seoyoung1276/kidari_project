// express의 미들웨어인 세션에 대해 공부하고 쿠키에 저장된 세션을 확인해보기
const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// session: 세션 관리용 미들웨어
// 로그인 등 특정 사용자를 위한 데이터를 임시적으로 저장할 때 사용
// 세션은 사용자별로 req.session 객체 안에 유지된다

app.use(session({
    resave: false, // 요청이 올 때 항상 다시 저장
    saveUninitialized: false, // 저장할 내역이 없더라도 처음부터 세션을 설정 
    secret: 'secret', // 쿠키를 서명하는 데 필요한 secret 값
    cookie: { // 쿠키 설정
        httpOnly: true, // 클라이언트에서 쿠키를 확인할 수 있는 지
        secure: false, // https 환경 사용 가능 여부 (false일 시 아니여도 사용 가능, 배포시에는 true로 두는 것이 좋다) 
        maxAge: 1000 * 60 *60 // 쿠키의 유효 시간 (저거는 1시간임) 
    },
    // name: "session-cookie",
}))

// 세션에는 store 이라는 옵션도 있다. 
// 위 예제 코드는 메모리에 저장하도록 되어있고 서버 재실행시 초기화 된다.

app.use((req, res, next)=>{
    req.session.name = 'test' // 세션 등록
    req.sessionID // 세션 아이디 확인
    req.session.destory() // 세션 모두 제거
    console.log('실행')
    next()
})

// req.session.name = 'test' // 세션 등록
// req.sessionID // 세션 아이디 확인
// req.session.destory() // 세션 모두 제거

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})