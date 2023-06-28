const express = require('express')
const bodyParser = require('body-parse')
const app = express()
app.use(bodyParser.json())
const port = 3000

//임시 데이터베이스
const database = {};
database.posts = {};
let currentId = 1;

app.post("/posts", (req, res)=>{
    if(!('text' in req.body &&
         'tittle' in req.body &&
         'author' in req.body &&
         'createdAt' in req.body)) {
            res.status(400).json({ result : "fail" })
         }
    console.log(req.body)
    req.body.comments = []
    database.posts[currentId++] = req.body
    res.json({"result" : "ok"})
})

app.get("/posts", (req, res)=> {
    res.json(database.posts)
})

app.get("/posts/:id", (req, res) => {
    res.json(database.posts[req.params.id])  
})

app.patch("/posts/:id", (req, res) => {
    Object.assign(database.posts[req.params.id], req.body)
    res.json({"result" : "ok"})
})
app.delete("/posts/:id", (req, res)=>{
    delete database.posts[req.params.id]
    res.json({"result" : "ok"})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})