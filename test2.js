const DocxParser = require('docx-parser');
const parser = new DocxParser();

// 读取docx文件并解析文本
const docxContent = fs.readFileSync('input2.docx');
const parsedDocx = parser.parse(docxContent);

console.log(parsedDocx.text); // 输出包含非断空格的字符串，非断空格将被转换为Unicode编码