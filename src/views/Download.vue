<!-- 下载文件 -->
<template>
  <div>下载文件</div>
</template>

<script>
import Json2excel from 'custom-json2excel'
export default {
  props: {},
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {
    download() {
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
    }

  },
  watch: {},
  mounted() {
    this.download()
  },
  created() {},
}
</script>

<style scoped>
</style>