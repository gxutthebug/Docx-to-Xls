const fs = require('fs')

// 读取文件
fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) throw err
  
  console.log(data)
  // 统计字符出现次数
  const counts = {}
  for (let i = 0; i < data.length; i++) {
    const char = data.charAt(i)
    const code = char.charCodeAt(0)
    if (code >= 0 && code <= 127) {
      // ASCII字符
      if (counts[char]) {
        counts[char]++
      } else {
        counts[char] = 1
      }
    } else {
      // 非ASCII字符，使用Unicode编码作为key
      const key = `${code.toString(16).toUpperCase()}`
      if (counts[key]) {
        counts[key]++
      } else {
        counts[key] = 1
      }
    }
  }

  // 输出结果
  console.log(counts)
})