const express = require('express')
const bodyParser = require('body-parse')
const app = express()
app.use(bodyParser.json())
const port  = 1219

//배열에 체크리스트를 넣을거임 DB대용
const database = {};
database.users = {
    "1": [],
    "2": []
}

app.post("/users/:uid/checklist", (req, res)=>{
    const uid = req.params.uid
    database.users[uid].push(req.body)
    console.log(database)
    res.json({"result : ok"})
})