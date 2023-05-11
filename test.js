

let line = '林泷	杨珂钰	廖思童	潘俊朗	温正驭	余依霓	古舒萌	董文慧	谭茜元 陶罗文俊'
const names = [];
let stuname =``
let reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;

    // for(let c of line) {
    //    if (reg.test(c)) {
    //       console.log(c)
    //       stuname = stuname+c
    //    } else if(stuname.length===1){
    //        console.log('这个空格不处理')
    //        continue
    //    } else {
    //        console.log('这个空格检查名字是否完整')
    //        if (stuname.length===0){
    //          continue
    //        } else {
    //         names.push(stuname)
    //         stuname =``
    //        } 
    //    }
    //  }
     

    //  console.log(reg.test(' '))
    //  console.log(names)


    console.log(line[0])
    console.log(line[1])
    console.log(line[2])
    console.log(line[3])
     
    console.log(line[2] === '')
    console.log(line[2] === '  ')
    console.log(line[2] === '   ')
    console.log(line[2] === '    ')

    console.log(line[2].trim() === '')