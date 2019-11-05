const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
	host : 'localhost',
	user : 'root', 
	password : '8576288',
	database : 'wzry'
})

// 开始链接
con.connect()

// 统一执行 sql 的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}