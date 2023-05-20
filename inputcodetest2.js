const fs = require('fs')

// 读取文件
fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) throw err

  // 统计字符出现次数
  const counts = {}
  for (let i = 0; i < data.length; i++) {
    const char = data.charAt(i)
      if (counts[char]) {
        counts[char]++
      } else {
        counts[char] = 1
      }
  }

  // 输出结果
  console.log(counts)
})