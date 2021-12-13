<!--  -->
<template>
  <div>
    <p>word</p>
    <input id="document" type="file">
    <div v-html="docHtml" />
  </div>
</template>

<script>
import mammoth from 'mammoth'
export default {
  props: {},
  data () {
    return {
      docHtml: ""
    };
  },
  components: {},
  computed: {},
  methods: {
    uploading(event) {
      const that = this
      var file = event.target.files[0] // 获取文件
      var reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = function(e) {
        const buffer = e.target.result // 此时是arraybuffer类型
        mammoth.convertToHtml({ arrayBuffer: buffer }).then((result) => {
          console.log(result)
          that.docHtml = result.value
        }).done()
      }
    },
  },
  watch: {},
  mounted() {
    document.getElementById('document').addEventListener('change', this.uploading, false)
  },
  created() {},
}
</script>

<style scoped>
</style>