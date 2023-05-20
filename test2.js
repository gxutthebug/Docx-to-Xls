const fs = require('fs')

// 读取文件
fs.readFile('./input2.docx','utf-8', (err, data) => {
if (err) throw err;

console.log(data)
})