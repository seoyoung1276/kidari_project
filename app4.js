const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');

const app = express()
app.use(bodyParser.json())
const port = 3000
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'study'
});

app.post("/posts", (req, res) => {
    console.log(req.body)
    pool.query(
        "insert into posts(title, content, author) values(?, ?, ?)",
        [req.body.title, req.body.content, req.body.author],
        function(err, rows, fields){
            res.json({ result: "ok"})
        }
    )
})

app.get("/posts", (req, res)=> {
    pool.query("SELECT * FROM posts", 
    function(err, rows, fields){
        res.json(rows)
    })
})

app.get("/posts/:id", (req, res)=> {
    pool.query("SELECT * FROM posts WHERE id = ?",
    [req.params.id], 
    function(err, rows, fields){
        if(rows.length === 0){
            res.json({ result: null })
        }else{
            res.json({ result: rows[0] })
        }
    })
})

app.delete("/posts/:id", (req, res) => {
    pool.query("DELETE FROM posts WHERE id = ?",
    [req.params.id],
    function(err, rows, fields){
        res.json({ result : "ok"})
    })
})

app.patch("/posts/:id",(req, res) => {
    pool.query("SELECT * FROM posts WHERE id = ?",
    [req.params.id], 
    function(err, rows, fields){
        if(rows.length === 0){
            res.json({ result: "fail" })
        }else{
            const post = rows[0]
            pool.query("UPDATE posts SET title=?, content=?, author=? WHERE id=?",
            [
                req.body.title ?? post.title,
                req.body.content ?? post.content,
                req.body.author ?? post.author,
                post.id
            ],
            function(err, rows, fields){
                res.json({ result: "ok" })
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})