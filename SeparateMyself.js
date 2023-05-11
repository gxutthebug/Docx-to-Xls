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
      let stuname =``
      let reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;

      for (const line of students) {
         for(let c of line) {
             if (reg.test(c)) {
                stuname = stuname+c
             } else if(stuname.length===1){
                 continue
             } else {
                if (stuname.length===0){
                    continue
                  }else {
                   names.push(stuname)
                   stuname =``
                  }
             }
         }
        // stuname =``  
        names.push(stuname)
        stuname =``
        //     解决:上一行的最后一个名字和下一行的第一个名字给连起来
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

  
//   console.log(classInfo.length)

})


/*
我在切割学生姓名时是一行一行切割的 , 
那要不要考虑每行的末尾会有同一个名字因为换行而被分到第二行的情况？

不用
*/ 





/*
这个版本比起AI给我提供的那个用正则表达式匹配的版本,是有不足的 , 就是在某些换行位置会把上一行的最后一个名字
和下一行的第一个名字给连起来的情况 , 这是为什么呢？

我认为其主要原因是当每一行读到最后一个字符时如果没有"非汉字"字符来做终结,
那么下一行的前3个字依然会被加入stuname 导致两个名字连起来 ,那么为什么会最后一个字符没有"非汉字"字符来做终结呢？
① 最后一个回车符没有被字符串纳入（不懂什么原因）
② 两个名字间的自然换行（没有使用换行符）
解决办法：即便我在每行循环完成后手动去再来清算一次stuname 也没有办法完全解决
所以这个方案不适合一行行去遍历 , 应该先把整个数组拼接成一个长字符串再去使用这个方案？
*/ 