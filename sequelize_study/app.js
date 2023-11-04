const express = require('express')
const path = require('path')
const morgan = require('morgan')
const nunjucks = require('nunjucks')

const { sequelize } = require('./models') // 폴더 내의 인덱스 파일은 require 할 때 이름 생략 가능

const app = express()
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'html')
nunjucks.configure('views',{
    express: app,
    watch: true,
})
// 해당 메서드를 사용해 서버를 실행할 때 DB와 연동 (promise니까 then일 때)
sequelize.sync({force: false})  // force: 서버를 실행할 때마다 테이블 재생성 여부. 테이블 잘못만들었을 때 true 하면 됨
    .then(()=>{
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.log(err)
    })

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use(express.urlencoded({ extended: false}))

app.use((req, res, next) =>{
    const error = new Error(`${req.method} &{req.url} 라우터가 없습니다. `)
    error.status = 404
    next(error)
})

app.use((err, req, res, next) =>{
    res.locals.message = err.message
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}
    res.render('error')
})

app.listen(app.get('port'), () =>{
    console.log(app.get('port'), '번 포트에서 대기 중')
})