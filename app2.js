const express = require('express')
const bodyParser = require('body-parser')
// express 생성자 함수 호출해서 app 객체 생성(app 객체 => 웹 서버 역할 수행)
const app = express()
app.use(bodyParser.json())
const port = 3000

const database = {};
database.posts = {};
let currentId = 1;

app.post("/posts", (req, res)=> {
    if(!('text' in req.body && 
        'tittle' in req.body &&
        'author' in req.body &&
        'createdAt' in req.body)) {
            res.status(400).json({ result: "fail"})
        }
    console.log(req.body)
    req.body.comments = []
    database.posts[currentId++] = req.body
    res.json({"result" : "ok"})
})

//전체 조회
app.get("/posts", (req, res)=> {
    res.json(database.posts)
})

//특정 게시글 조회
app.get("/posts/:id", (req, res) => {
    res.json(database.posts[req.params.id])
})

app.patch("/posts/:id", (req, res) => {
    // Object.assign(target, source) => 타켓을 소스로 변경해서 반환
    // 합칠 때도 사용하고 값을 변경할 때도 사용하고 다양하게 사용할 수 있는듯 
    // 아래 코드는 데이터베이스에 있는 게시글을 현재 바디의 내용으로 변경
    Object.assign(database.posts[req.params.id], req.body)

    res.json({"result" : "ok"})
})
app.delete("/posts/:id", (req, res) => {
    delete database.posts[req.params.id]
    res.json({"result" : "ok"})
})
app.post("/posts/:id/comments",(req, res) => {
    database.posts[req.params.id].comments.push(req.body)
    console.log(database.posts[req.params.id])
    res.json({ result: "ok"})
})
app.get("/posts/:id/comments",(req, res) => {
    res.json(database.posts[req.params.id].comments)
})
app.patch("/posts/:pid/comments/:idx", (req, res) => {
    const { pid, idx } = req.params
    Object.assign(database.posts[pid].comments[idx], req.body)
    res.json({"result" : "ok"})
})
app.delete("/posts/:pid/comments/:idx", (req, res) => {
    const { pid , idx } = req.params
    // splice() 메서드를 이용하여 배열에 있는 해당 인덱스의 내용을 삭제함
    delete database.posts[pid].comments.splice(idx,1)
    res.json({"result" : "ok"})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })