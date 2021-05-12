<!-- 下载文件 -->
<template>
  <div>
    <div @click="downloadByJson2excel">下载文件 - Json2excel插件</div>
    <div @click="downloadByJsXlsx">下载文件 - Xlsx插件</div>
    <div @click="downloadByJsXlsxStyle">下载文件 - XlsxStyle插件</div>
  </div>
</template>

<script>
import Json2excel from 'custom-json2excel'
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';
export default {
  props: {},
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {
    downloadByJson2excel() {
      const data = [
        {
          name: '哈哈',
          age: 1,
          sex: '男',
          companyName: '公司1',
          companyAddress: '公司地址1'
        },
        {
          name: '呵呵',
          age: 2,
          sex: '女',
          companyName: '公司2',
          companyAddress: '公司地址2'
        },
        {
          name: '嘻嘻',
          age: 3,
          sex: '男',
          companyName: '公司3',
          companyAddress: '公司地址3'
        },
        {
          name: '啦啦',
          age: 4,
          sex: '女',
          companyName: '公司4',
          companyAddress: '公司地址4'
        }
      ]
      const keyMap = {
        name: '姓名',
        age: '年龄1',
        sex: '性别',
        companyName: '公司名称',
        companyAddress: '公司地址'
      }
      const filters = ['sex']
      const title = [
        { name: '个人信息', colspan: 3 },
        { name: '公司信息', colspan: 2 }
      ]
      const name = 'ceshi'
      const json2excel = new Json2excel({ data, keyMap, filters, name })
      json2excel.generate()
    },
    downloadByJsXlsx() {
      let excel = '';
      let row = "<tr>";
      row += "<td>工单编号</td>";
      row += "<td>工单主题</td>";
      row += "<td>预约人</td>";
      row += "<td>审批人</td>";
      row += "<td>发起预约时间</td>";
      row += "<td>预约开始时间</td>";
      row += "<td>预约结束时间</td>";
      row += "<td>实际结束预约时间</td>";
      row += "<td>工程预约状态</td>";
      row += "</tr>"
      row += "<tr>"
      row += `<td>1</td>`;
      row += `<td>2</td>`;
      row += "</tr>"
      row += "<tr>"
      row += "</tr>"
      row += "<tr>";
      row += "<td>工程预约网元</td>";
      row += "<td>设备类型</td>";
      row += "<td>大区</td>";
      row += "<td>厂家</td>";
      row += "</tr>"
      row += "<tr>";
      row += `<td>2</td>`;
      row += `<td>3</td>`;
      row += "</tr>";
      //换行
      excel += row
      console.log(excel);
      let tabledom = document.createElement("table");
      tabledom.innerHTML = excel;
      console.log(tabledom)
      // 初始化
      let workbook = XLSX.utils.book_new();
      let sheet = XLSX.utils.table_to_sheet(tabledom);
      console.log(sheet)
      XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
      XLSX.writeFile(workbook, 'table.xlsx');
      // let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
      // let link = document.createElement("a");
      // link.href = uri;
      // link.style = "visibility:hidden";
      // link.download = "测试.xls";
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    },
    downloadByJsXlsxStyle() {
      let excel = '';
      let row = "<tr>";
      row += "<td>工单编号</td>";
      row += "<td>工单主题</td>";
      row += "</tr>"
      row += "<tr>"
      row += `<td>1</td>`;
      row += `<td>2</td>`;
      row += "</tr>"
      row += "<tr>"
      row += "</tr>"
      row += "<tr>";
      row += "<td>工程预约网元</td>";
      row += "<td>设备类型</td>";
      row += "</tr>"
      row += "<tr>";
      row += `<td>2</td>`;
      row += `<td>3</td>`;
      row += "</tr>";
      //换行
      excel += row
      console.log(excel);
      //设置列宽度[{wch:20}]
      const colsconfig = [{wch:20}, {wch:10}];
      let tabledom = document.createElement("table");
      tabledom.innerHTML = excel;
      console.log(tabledom)
      // 初始化
      let workbook = XLSX.utils.book_new();
      let sheet = XLSX.utils.table_to_sheet(tabledom);
      sheet['!cols'] = colsconfig //设置列属性
      Object.keys(sheet).forEach((key) => {//设置单元格属性
        if (key.indexOf('!') < 0) {
          sheet[key].s = {
            alignment: {
              horizontal: 'center',
              vertical: 'center',
              wrapText: true,
            },
          }
        }
      })
      sheet["A1"].s = {
        font: {
          name: '宋体',
          sz: 24,
          bold: true,
          underline: true,
          color: {
            rgb: "FFFFAA00"
          }
        },
        alignment: { horizontal: "center", vertical: "center", wrap_text: true },
        fill: { bgColor: { indexed:64 }, fgColor: { rgb:"FFFF00" }}   // 背景色和前景色
      };
      sheet['A1'].z = 'yyyy-mm-dd hh:mm:ss'; // 设置时间格式
      console.log(sheet)
      this.downloadExcel(this.sheet2blob(sheet), `测试.xlsx`); //下载
    },
    sheet2blob(sheet, sheetName) {
      sheetName = sheetName || 'sheet1';
      var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
      };
      workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

      var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
      };
      var wbout = XLSXStyle.write(workbook, wopts);
      var blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
      }); // 字符串转ArrayBuffer
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
      return blob;
    },
    downloadExcel(url, saveName) {
      if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
      }
      var aLink = document.createElement('a');
      aLink.href = url;
      aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event;
      if (window.MouseEvent) event = new MouseEvent('click');
      else {
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
</style>