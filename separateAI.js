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

        if (lines[2].includes("：")||lines[2].includes(":")) {
         students = lines.slice(3); // 从第4行开始分割
        } else {
         students = lines.slice(2); // 从第3行开始分割
        }
         
        // console.log(students)

        function splitNames(students) {
         const nameRegex = /[\u4e00-\u9fa5]{2,4}/g;
         let names = [];
       
         for (const line of students) {
           const matchedNames = line.match(nameRegex);
           if (matchedNames) {
             names = names.concat(matchedNames);
           }
         }
       
         return names;
       }
       
       const result = splitNames(students);
    
         classInfo.push({
          className,
          teacher,
          result,
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
  // console.log(classInfo.length)

})


/*
这个版本不能处理异常空格情况, 可以格式化解决
*/ 


/*
我在切割学生姓名时是一行一行切割的 , 
那要不要考虑每行的末尾会有同一个名字因为换行而被分到第二行的情况？
不用
*/ 
