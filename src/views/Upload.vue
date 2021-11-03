<!-- 读取上传文件 -->
<template>
  <div class="upload-page">
    <div>
      参考：
      https://www.cnblogs.com/liuxianan/p/js-excel.html
    </div>
    <!-- 测试一 -->
    <Divider>测试一: 原生js + html + txt 上传</Divider>
    上传文件 ： <input type="file" name = "file" id = "fileId" /> 
    <Button @click="test1">提交</Button>

    <!-- 测试二 -->
    <Divider>测试二: iview + txt 上传（多个文件）</Divider>
    <Upload
        multiple
        type="drag"
        accept=".txt"
        :default-file-list="defaultList"
        :before-upload="handleUpload"
        :on-remove="removeHandler"
        action="/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或者拖拽上传</p>
        </div>
    </Upload>
    <Button @click="test2">提交</Button>

    <!-- 测试三 -->
    <Divider>测试三: iview + excel (xlsx)上传（多个文件）</Divider>
    <Upload
        multiple
        type="drag"
        accept=".xlsx"
        :default-file-list="defaultList3"
        :before-upload="handleUpload3"
        :on-remove="removeHandler3"
        action="/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或者拖拽上传</p>
        </div>
    </Upload>
    <Button @click="test3">提交</Button>
    <Button @click="download3">导出</Button>
    <div id="result"></div>

    <!-- 测试四 -->
    <Divider>测试四: iview + excel (xlsx)上传（多个文件）+ 合并成一个excel</Divider>
    <Upload
        multiple
        type="drag"
        accept=".xlsx"
        :default-file-list="defaultList4"
        :before-upload="handleUpload4"
        :on-remove="removeHandler4"
        action="/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或者拖拽上传</p>
        </div>
    </Upload>
    <Button @click="download4">导出一个excel</Button>
    <div id="result"></div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {},
  data () {
    return {
      defaultList: [],
      defaultList3: [],
      defaultList4: [],
      sheetInfo: {
        SheetNames: [],
        Sheets: {}
      }
    };
  },
  components: {},
  computed: {},
  methods: {
    // 测试一提交
    test1() {
      let objFile = document.getElementById("fileId");
      if(objFile.value == "") {
        return alert("不能空")
      }
      console.log(objFile.files); // 文件字节数
      let files = objFile.files;//获取到文件列表
      if(files.length == 0) {
        alert('请选择文件');
      }else {
        let reader = new FileReader();//新建一个FileReader
        reader.readAsText(files[0], "utf-8");//读取.txt文件 
        // reader.readAsArrayBuffer(files[0]) // 读取任意文件
        reader.onload = function(evt){ //读取完文件之后会回来这里
          // let fileString = new Uint8Array(evt.target.result); // 读取文件内容
          // let snippets = new TextDecoder('gb2312').decode(fileString)
          console.log(evt.target.result)
        }
      }
    },
    // 上传文件前
    handleUpload(response) {
      if(!/\.txt$/g.test(response.name)) {
				alert('仅支持读取txt格式！');
				return;
			}
      this.defaultList.push(response);
      return false;
    },
    // 移除文件
    removeHandler(file, fileList) {
      this.defaultList = fileList;
    },
    // 上传文件前
    handleUpload3(response) {
      if(!/\.xlsx$/g.test(response.name)) {
				alert('仅支持读取xlsx格式！');
				return;
			}
      this.defaultList3.push(response);
      return false;
    },
    // 移除文件
    removeHandler3(file, fileList) {
      this.defaultList3 = fileList;
    },
    // 上传文件前
    handleUpload4(response) {
      if(!/\.xlsx$/g.test(response.name)) {
				alert('仅支持读取xlsx格式！');
				return;
			}
      this.defaultList4.push(response);
      return false;
    },
    // 移除文件
    removeHandler4(file, fileList) {
      this.defaultList4 = fileList;
    },
    // 测试二提交
    test2() {
      if(!this.defaultList.length) {
        return alert("不能空")
      }
      console.log(this.defaultList); // 文件字节数
      let files = this.defaultList;//获取到文件列表
      if(files.length == 0) {
        alert('请选择文件');
      }else {
        files.map((x, i) => {
          let reader = new FileReader();//新建一个FileReader
          reader.readAsText(x, "utf-8");//读取.txt文件 
          // reader.readAsArrayBuffer(files[0]) // 读取任意文件
          reader.onload = function(e){ //读取完文件之后会回来这里
            // let fileString = new Uint8Array(evt.target.result); // 读取文件内容
            // let snippets = new TextDecoder('gb2312').decode(fileString)
            console.log(`第${i+1}个文件；   ${e.target.result}`)
          }
        })
      }
    },
    // 测试三提交
    test3() {
      if(!this.defaultList3.length) {
        return alert("不能空")
      }
      console.log(this.defaultList3); // 文件字节数
      let files = this.defaultList3;//获取到文件列表
      if(files.length == 0) {
        alert('请选择文件');
      }else {
        files.map((x, i) => {
          // let reader = new FileReader();//新建一个FileReader
          // reader.readAsText(x, "utf-8");//读取.txt文件 
          // // reader.readAsArrayBuffer(files[0]) // 读取任意文件
          // reader.onload = function(e){ //读取完文件之后会回来这里
          //   // let fileString = new Uint8Array(evt.target.result); // 读取文件内容
          //   // let snippets = new TextDecoder('gb2312').decode(fileString)
          //   console.log(`第${i+1}个文件；   ${e.target.result}`)
          // }
          this.readWorkbookFromLocalFile(x, (workbook) => {
            this.readWorkbook(workbook)
          })
        })
      }
    },
    // 测试三导出
    download3() {
      if(!this.defaultList3.length) {
        return alert("不能空")
      }
      console.log(this.defaultList3); // 文件字节数
      let files = this.defaultList3;//获取到文件列表
      if(files.length == 0) {
        alert('请选择文件');
      }else {
        files.map((x, i) => {
          // let reader = new FileReader();//新建一个FileReader
          // reader.readAsText(x, "utf-8");//读取.txt文件 
          // // reader.readAsArrayBuffer(files[0]) // 读取任意文件
          // reader.onload = function(e){ //读取完文件之后会回来这里
          //   // let fileString = new Uint8Array(evt.target.result); // 读取文件内容
          //   // let snippets = new TextDecoder('gb2312').decode(fileString)
          //   console.log(`第${i+1}个文件；   ${e.target.result}`)
          // }
          this.readWorkbookFromLocalFile(x, (workbook) => {
            let sheetNames = workbook.SheetNames; // 工作表名称集合
            let worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
            let csv = XLSX.utils.sheet_to_csv(worksheet);
            let sheet = this.csv2sheet(csv);
            // 设置单元格合并
            sheet['!merges'] = worksheet['!merges']
            sheet['!margins'] = worksheet['!margins']
            let blob = this.sheet2blob(sheet, sheetNames[0]);
            this.openDownloadDialog(blob, '导出.xlsx')
          })
        })
      }
    },
    // 测试四导出
    async download4() {
      if(!this.defaultList4.length) {
        return alert("不能空")
      }
      console.log(this.defaultList4); // 文件字节数
      let files = this.defaultList4;//获取到文件列表
      if(!files.length) {
        return alert('请选择文件');
      }
      this.sheetInfo = {
        SheetNames: [],
        Sheets: {}
      };
      for(let i = 0; i < files.length; i++) {
        //   let reader = new FileReader();//新建一个FileReader
        // reader.readAsText(x, "utf-8");//读取.txt文件 
        // // reader.readAsArrayBuffer(files[0]) // 读取任意文件
        // reader.onload = function(e){ //读取完文件之后会回来这里
        //   // let fileString = new Uint8Array(evt.target.result); // 读取文件内容
        //   // let snippets = new TextDecoder('gb2312').decode(fileString)
        //   console.log(`第${i+1}个文件；   ${e.target.result}`)
        // }
        await this.readWorkbookFromLocalFile_test4(files[i]).then((workbook) => {
          debugger
          let sheetNames = workbook.SheetNames; // 工作表名称集合
          for(let j = 0; j < sheetNames.length; j ++) {
            this.sheetInfo.SheetNames.push(sheetNames[j]);
            let worksheet = workbook.Sheets[sheetNames[j]]; // 这里我们读取第y张sheet
            let csv = XLSX.utils.sheet_to_csv(worksheet);
            let sheet = this.csv2sheet(csv);
            // 设置单元格合并
            if( worksheet['!merges']) {
              sheet['!merges'] = worksheet['!merges']
            }
            if( worksheet['!margins']) {
              sheet['!margins'] = worksheet['!margins']
            }
            this.sheetInfo.Sheets[sheetNames[j]] = sheet
          }
        })
      }
      let blob = this.sheet2blob_more(this.sheetInfo);
      this.openDownloadDialog(blob, '导出.xlsx')
    },
    readWorkbookFromLocalFile(file, callback) {
      let reader = new FileReader();
      reader.onload = function(e) {
        let data = e.target.result;
        let workbook = XLSX.read(data, {type: 'binary'});
        if(callback) callback(workbook);
      };
      reader.readAsBinaryString(file);
    },
    readWorkbookFromLocalFile_test4(file, callback) {
      return new Promise((resolve, reject) => {
        console.log(222)
        let reader = new FileReader();
        reader.onload = function(e) {
          let data = e.target.result;
          let workbook = XLSX.read(data, {type: 'binary'});
          // if(callback) callback(workbook);
          resolve(workbook)
        };
        reader.readAsBinaryString(file);
      })
    },
    // 读取workbook
    readWorkbook(workbook) {
      // let sheetNames = workbook.SheetNames; // 工作表名称集合
      // let worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
      // let csv = XLSX.utils.sheet_to_csv(worksheet);
      // document.getElementById('result').innerHTML = csv2table(csv);
      console.log(workbook)
      let sheetNames = workbook.SheetNames; // 工作表名称集合
      // sheetNames.forEach(name => {
      //   let worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
      //   for(let key in worksheet) {
      //     // v是读取单元格的原始值
      //     console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
      //   }
      // });
      let worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
      let csv = XLSX.utils.sheet_to_csv(worksheet);
      document.getElementById('result').innerHTML = this.csv2table(csv); // 生成html
    },
    // 将csv转换成简单的表格，会忽略单元格合并，在第一行和第一列追加类似excel的索引
    csv2table(csv) {
      let html = '<table>';
      let rows = csv.split('\n');
      rows.pop(); // 最后一行没用的
      rows.forEach(function(row, idx) {
        let columns = row.split(',');
        columns.unshift(idx+1); // 添加行索引
        if(idx == 0) { // 添加列索引
          html += '<tr>';
          for(let i=0; i<columns.length; i++) {
            html += '<th>' + (i==0?'':String.fromCharCode(65+i-1)) + '</th>';
          }
          html += '</tr>';
        }
        html += '<tr>';
        columns.forEach(function(column) {
          html += '<td>'+column+'</td>';
        });
        html += '</tr>';
      });
      html += '</table>';
      return html;
    },
    // csv转sheet对象
    csv2sheet(csv) {
      let sheet = {}; // 将要生成的sheet
      csv = csv.split('\n');
      csv.forEach(function(row, i) {
        row = row.split(',');
        if(i == 0) sheet['!ref'] = 'A1:'+String.fromCharCode(65+row.length-1)+(csv.length-1);
        row.forEach(function(col, j) {
          sheet[String.fromCharCode(65+j)+(i+1)] = {v: col};
        });
      });
      return sheet;
    },
    // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
    sheet2blob(sheet, sheetName) {
      sheetName = sheetName || 'sheet1';
      let workbook = {
        SheetNames: [sheetName],
        Sheets: {}
      };
      workbook.Sheets[sheetName] = sheet;
      // 生成excel的配置项
      let wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
      };
      let wbout = XLSX.write(workbook, wopts);
      let blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
      // 字符串转ArrayBuffer
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
      return blob;
    },
    // 将多个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
    sheet2blob_more(sheetInfo) {
      let workbook = {...sheetInfo}
      // 生成excel的配置项
      let wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
      };
      let wbout = XLSX.write(workbook, wopts);
      let blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
      // 字符串转ArrayBuffer
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
      return blob;
    },
    /**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
    openDownloadDialog(url, saveName) {
      if(typeof url == 'object' && url instanceof Blob)
      {
        url = URL.createObjectURL(url); // 创建blob地址
      }
      let aLink = document.createElement('a');
      aLink.href = url;
      aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      let event;
      if(window.MouseEvent) event = new MouseEvent('click');
      else
      {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      aLink.dispatchEvent(event);
    }
  },
  watch: {},
  mounted() {
  },
  created() {},
}
</script>

<style scoped>
.upload-page{
  text-align: center;
}
</style>