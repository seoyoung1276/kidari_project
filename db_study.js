const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'study'
});

// pool.query("SELECT 1", function(err, rows, fields){
//     console.log(rows)
// })

// pool.query('insert into posts(title, content, author) values("노드에서", "우왕", "서영");', function(err, rows, fields){
//     pool.end()
// })

const title = "title 1";
const content = "content 1";
const author = "author 1";

pool.query('insert into posts(title, content, author) values(?, ?, ?);',[title, content, author], function(err, rows, fields){
    pool.end()
})