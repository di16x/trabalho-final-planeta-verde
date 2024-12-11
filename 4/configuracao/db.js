const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'planeta_verde'
})

module.exports=pool.promise()