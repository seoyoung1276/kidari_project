const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 1219

const database = {};
database.users = {
    "1": [],
    "2": []
}

app.post("/users/:uid/checklist", (req, res) => {
    const uid = req.params.uid
    database.users[uid].push(req.body)
    console.log(database)
    res.json({"result" : "ok"})
})
app.get("/users/:uid/checklist", (req, res) => {
    res.json(database.users[req.params.uid])
})
app.patch("/users/:uid/checklist/:index", (req, res) => {
    const uid = req.params.uid
    const index = req.params.index -1
    Object.assign(database.posts[uid][index], req.body)
    res.json({"result" : "ok"})
})
app.delete("/users/:uid/checklist/:index", (req, res) => {
    const uid = req.params.uid
    const index = req.params.index -1
    database.users[uid].splice(index,1)
    res.json({"result" : "ok"})
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})