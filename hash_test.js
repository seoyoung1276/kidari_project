const crypto = require('crypto')
const hashPassword = crypto.createHash('sha256').update("hello1234").digest('hex')
console.log(hashPassword)

const bcrypt = require('bcrypt');
// const saltRounds = 10; // 반복횟수 10이면 1024? 
// const myPlaintextPassword = 'hello';
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash){
//     console.log(hash);
// })

const myPlaintextPassword = 'hello';
const hashFromDatabase = "$2b$10$CQtSGq2DVS9PJvFu.JzuD.CinVYM1ItBDCSbNwDOSiHFa7JkUwMdm"
bcrypt.compare(myPlaintextPassword, hashFromDatabase, function(err, result){
    console.log(result)
});