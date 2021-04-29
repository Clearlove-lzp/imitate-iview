<!-- 分页表格 -->
<template>
  <div class="pageTable">
    <div class="cds-header">
      <div class="d1">
        <span class="sp1"></span>
        <span class="sp2">wangYuan</span>
      </div>
    </div>
    <div style="margin-bottom: 10px">
      <Upload
        style="display: inline-block"
        :action="uploadUrl"
        :on-success="successHandler"
        :show-upload-list="false"
        ref="my-uploadF"
        size="small">
        <Button type="info">{{"批量导入"}}</Button>
      </Upload>
      <Button type="success" @click.native="addRow('testArr')">新增一行</Button>
    </div>
    <Table ref="refTable" border :columns="columns('refTable', 'testArr1')" :data="testArr1">
      <template slot="name1" slot-scope="props">
        <Input v-model="props.row.name1" @on-change="dataChange(props)"></Input>
      </template>
      <template slot="name2" slot-scope="props">
        <Input v-model="props.row.name2" @on-change="dataChange(props)"></Input>
      </template>
      <template slot="name3" slot-scope="props">
        <Input v-model="props.row.name3" @on-change="dataChange(props)"></Input>
      </template>
      <template slot="name4" slot-scope="props">
        <Input v-model="props.row.name4" @on-change="dataChange(props)"></Input>
      </template>
      <template slot="name5" slot-scope="props">
        <Input v-model="props.row.name5" @on-change="dataChange(props)"></Input>
      </template>
    </Table>
    <div style="margin-top: 10px;">
      <Page :total="total" :current="current" :page-size="pageSize" @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
import { uploadUrl, uploadInfoApi } from '@/api/index'

export default {
  props: {},
  data () {
    return {
      testArr: [],
      current: 1,
      pageSize: 10,
      uploadUrl: "",
    };
  },
  components: {},
  computed: {
    columns() {
      return (dom, val) => {
        let arr = [
          {
            type: "index",
            title: "序号",
            width: 70,
            align: "center",
          },
          {
            title: "名称1",
            key: "name1",
            render: (h, params) => {
              this[val][params.index] = params.row;
              return h(
                "div",
                this.$refs[dom].$scopedSlots.name1({
                  row: params.row,
                  idx: params.row._index,
                })
              );
            },
          },
          {
            title: "名称2",
            key: "name2",
            render: (h, params) => {
              this[val][params.index] = params.row;
              return h(
                "div",
                this.$refs[dom].$scopedSlots.name2({
                  row: params.row,
                  idx: params.row._index,
                })
              );
            },
          },
          {
            title: "名称3",
            key: "name3",
            width: 150,
            render: (h, params) => {
              this[val][params.index] = params.row;
              return h(
                "div",
                this.$refs[dom].$scopedSlots.name3({
                  row: params.row,
                  idx: params.row._index,
                })
              );
            },
          },
          {
            title: "名称4",
            key: "name4",
            width: 150,
            render: (h, params) => {
              this[val][params.index] = params.row;
              return h(
                "div",
                this.$refs[dom].$scopedSlots.name4({
                  row: params.row,
                  idx: params.row._index,
                })
              );
            },
          },
          {
            title: "操作",
            key: "ctrl",
            align: "center",
            width: 110,
            render: (h, params) => {
              return (
                "div",
                [
                  h(
                    "Poptip",
                    {
                      props: {
                        confirm: true,
                        title: "您确定要删除这条数据吗?",
                        transfer: true,
                      },
                      style: {
                        cursor: "pointer",
                      },
                      attrs: {
                        title: "删除",
                      },
                      on: {
                        "on-ok": () => {
                          this.deleteData(val,params.row, params.index);
                        },
                      },
                    },
                    [
                      h(
                        "Button",
                        {
                          props: {
                            type: "error",
                            size: "small",
                            icon: "ios-trash",
                          },
                          on: {
                            click: () => {},
                          },
                        },
                        "删除"
                      ),
                    ]
                  ),
                ]
              );
            },
          },
        ];
        if(this.isNfv) {
          arr.splice(5, 0, {
            title: "名称5",
            key: "name5",
            width: 150,
            render: (h, params) => {
              this[val][params.index] = params.row;
              return h(
                "div",
                this.$refs[dom].$scopedSlots.name5({
                  row: params.row,
                  idx: params.row._index,
                })
              );
            },
          },)
        }
        return arr
      }
    },
    total() {
      return this.testArr.length
    },
    testArr1() {
      let arr = []
      let baseArr = JSON.parse(JSON.stringify(this.testArr))
      return baseArr.filter((item, index) => {
        return ((this.current - 1) * this.pageSize <= index) && (index < this.current * this.pageSize)
      })
    }
  },
  methods: {
    // 新增一行网元
    addRow(val) {
      if (this[val].length === 0) {
        this[val].push({
          name1: "",
          name2: "",
          name3: "",
          name4: "",
        });
      } else {
        this[val].push(this[val][this[val].length - 1]);
      }
    },
    // 删除网元
    deleteData(val, data, index) {
      this[val].splice(index, 1);
    },
    changePage(value) {
      this.current = value
    },
    dataChange(value) {
      let num = (this.current - 1) * this.pageSize + value.idx
      this.testArr[num] = {
        name1: value.row.name1,
        name2: value.row.name2,
        name3: value.row.name3,
        name4: value.row.name4,
      }
    },
    // 上传成功钩子-影响网元
    successHandler(response, file, fileList) {
      if (response.filename && response.id) {
        this.$Message.success("上传成功");
        let params = `fileId=${response.id}`
        uploadInfoApi(params).then(res => {
          if (res.data.success && res.data.data) {
            if (this.testArr.length === 1 && !this.testArr[0].name1) {
              this.testArr = [];
            }
            res.data.data.forEach((item) => {
              this.testArr.push({
                name1: item["name1"],
                name2: item["name2"],
                name4: item["name4"],
                name3: item["name3"],
              });
            });
          }
        })
      } else {
        this.$Message.success("上传失败");
      }
    },
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.testArr = []
      // this.testArr = [
      //   {
      //     name1: "1",
      //     name2: "1",
      //     name3: "1",
      //     name4: "1",
      //   },
      //   {
      //     name1: "2",
      //     name2: "2",
      //     name3: "2",
      //     name4: "2",
      //   },
      //   {
      //     name1: "3",
      //     name2: "3",
      //     name3: "3",
      //     name4: "3",
      //   },
      //   {
      //     name1: "4",
      //     name2: "4",
      //     name3: "4",
      //     name4: "4",
      //   },
      //   {
      //     name1: "5",
      //     name2: "5",
      //     name3: "5",
      //     name4: "5",
      //   },
      //   {
      //     name1: "6",
      //     name2: "6",
      //     name3: "6",
      //     name4: "6",
      //   },
      //   {
      //     name1: "7",
      //     name2: "7",
      //     name3: "7",
      //     name4: "7",
      //   },
      //   {
      //     name1: "8",
      //     name2: "8",
      //     name3: "8",
      //     name4: "8",
      //   },
      //   {
      //     name1: "9",
      //     name2: "9",
      //     name3: "9",
      //     name4: "9",
      //   },
      //   {
      //     name1: "10",
      //     name2: "10",
      //     name3: "10",
      //     name4: "10",
      //   },
      //   {
      //     name1: "11",
      //     name2: "11",
      //     name3: "11",
      //     name4: "11",
      //   },
      //   {
      //     name1: "12",
      //     name2: "12",
      //     name3: "12",
      //     name4: "12",
      //   },
      //   {
      //     name1: "13",
      //     name2: "13",
      //     name3: "13",
      //     name4: "13",
      //   },
      //   {
      //     name1: "14",
      //     name2: "14",
      //     name3: "14",
      //     name4: "14",
      //   },
      //   {
      //     name1: "15",
      //     name2: "15",
      //     name3: "15",
      //     name4: "15",
      //   },
      //   {
      //     name1: "16",
      //     name2: "16",
      //     name3: "16",
      //     name4: "16",
      //   },
      //   {
      //     name1: "17",
      //     name2: "17",
      //     name3: "17",
      //     name4: "17",
      //   },
      //   {
      //     name1: "18",
      //     name2: "18",
      //     name3: "18",
      //     name4: "18",
      //   },
      //   {
      //     name1: "19",
      //     name2: "19",
      //     name3: "19",
      //     name4: "19",
      //   },
      // ]
    })
  },
  created() {
    this.uploadUrl = uploadUrl
  },
}
</script>

<style scoped lang="stylus">
.cds-header {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  font-size: 16px;
  color: #333;
  .d1 {
    display: flex;
    align-items: center;
    .sp1 {
      margin-right: 4px;
      width: 4px;
      height: 18px;
      border-radius: 2px;
      background: #315eff;
    }
  }
  .d2 {
    .btn {
      height: 26px;
      line-height: 10px;
    }
  }
}
</style>