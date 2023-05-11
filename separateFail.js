var docxParser = require('docx-parser');

docxParser.parseDocx("input2.docx", function(data){
        
  // 以空行为间隔，将文本分割成若干段
  const paragraphs = data.split(/\n\s*\n/);
  // console.log(paragraphs)
  const arr = []
  let classInfo = []
  let teacher  =''
  let students =[]

  // 输出分割得到的每一段文本
  paragraphs.forEach((paragraph, index) => {
            
          
      if(index>2||index===2) {
        const lines = paragraph.split('\n');
        const className = lines[0];
        const spaces = lines[1].split(" ").length - 1;
        if(spaces ==2 ){
           teacher = lines[1].split('  ')[1];   // 处理不了名字两个字的
        }else if(spaces == 4) {
           teacher = lines[1].charAt(lines[1].length - 4) + lines[1].charAt(lines[1].length - 1) 
        }
        else {
           teacher = lines[1].split("：")[1];
        }

        if (lines[2].includes("：")) {
         students = lines.slice(3); // 从第4行开始分割
        } else {
         students = lines.slice(2); // 从第3行开始分割
        }
         
      //   console.log(students)

      const names = [];

      for (const line of students) {
        let startIndex = 0;
        let endIndex = 0;
        let hasTwoSpaces = false;
      
        // 查找所有名字
        while (endIndex < line.length) {
          if (line[endIndex] === ' ' && line[endIndex + 1] !== ' ') {
            names.push(line.substring(startIndex, endIndex));
            startIndex = endIndex + 1;
            hasTwoSpaces = false;
          } else if (line[endIndex] === ' ' && line[endIndex + 1] === ' ') {
            if (!hasTwoSpaces) {
              hasTwoSpaces = true;
              endIndex++;
            } else {
              names.push(line.substring(startIndex, endIndex));
              startIndex = endIndex + 1;
              hasTwoSpaces = false;
            }
          }
          endIndex++;
        }
      
        // 添加最后一个名字
        if (startIndex < endIndex) {
          names.push(line.substring(startIndex, endIndex));
        }
      }
      
    
         classInfo.push({
          className,
          teacher,
          names,
       })
      }

  });
  
//   classInfo.forEach(item=> {
//        console.log(item)
//   })
   
  console.log(classInfo[1])
  console.log(classInfo[120])
  console.log(classInfo[220])
  console.log(classInfo[320])
  console.log(classInfo[420])
  console.log(classInfo[520])
  console.log(classInfo.length)

})


/*
这个版本其实有很多问题 ， 比如不能处理两个名字间是两个空格的情况 ，但我依然决定保留下来
因为它提供了一种用双指针来确定名字区间的思路
*/ 