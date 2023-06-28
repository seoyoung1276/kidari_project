//console.log("Hello~");

//require => 자바의 import구문 (주로 npm install한 모듈(패키지)를 불러오기 위해서 사용)
const express = require('express')
// express 생성자 함수 호출해서 app 객체 생성(app 객체 => 웹 서버 역할 수행)
const app = express()
const port = 3000

/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/json', (req,res) => {
    res.json({message: "Hello"})
})

app.get('/api/me',(req,res) => {
    res.json({Name:"이서영", Age:"18", job:"student"})
})
*/

/*
app.post("/calc1/:num1/:num2", (req, res) => {
  const num1 = +req.params.num1
  const num2 = +req.params.num2
  res.json({result: num1 + num2})
})

app.post("/check/:num", (req, res) => {
  const num = +req.params.num
  res.json({result: num % 2 == 0 })
})

app.post("/calc2", (req, res) => {
  const num1 = +req.query.num1
  const num2 = +req.query.num2
  res.json({ result: num1 + num2 })
})

app.post("/check",(req,res) => {
  const num = +req.query.num1
  res.json({ result : num % 2 == 0})
})

app.post("/calc3", (req, res) => {
  //console.log(req.header)
  //console.log(JSON.stringify(req.headers))
  const num1 = +req.header("My-Number1")
  const num2 = +req.header("My-Number2")

  res.json({ result: num1 + num2 })
})
*/

const words = []

app.post("/api/words",(req,res)=> {
  //const words = [req.query.words]
  words.push(req.query.word)
  res.json({ "result" : "success"})
})
app.get("/api/words",(req,res)=> {
  res.json(words)
})
app.delete("/api/words",(req,res)=>{
  words.length = 0
  res.json({"result" : "success"})
})
// Q) POST "/api/words" 로 요청 보내는데 word 라는 키를 이용해서
// 쿼리 스트링으로 보내면 해당 값을 words 배열에 추가

// Q) GET "/api/words"로 요청 보내면 words 배열값 자체를 반환

// app의 listen 메서드 port 번호를 전달해서 웹 서버를 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})