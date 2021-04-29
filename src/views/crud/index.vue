<!-- 增删改查 -->
<template>
  <div>
    <div class="search">
      <Input v-model="query.name" placeholder="名称" clearable style="width: 200px" class="filter-item" />
      <DatePicker v-model="query.time" type="datetimerange" placeholder="开始时间-结束时间" style="width: 320px" :options="options" class="filter-item"></DatePicker>
      <Select v-model="query.status" style="width: 100px" clearable class="filter-item">
        <Option value="启用">启用</Option>
        <Option value="禁用">禁用</Option>
      </Select>
      <Button type="success" class="filter-item" icon="md-search" @click="queryHandler">查询</Button>
      <Button type="warning" class="filter-item" icon="md-refresh" @click="resetQuery">重置</Button>
      <Button type="primary" class="filter-item" icon="md-add" @click="addHandler">新增</Button>
      <Button type="warning" class="filter-item" icon="ios-create-outline" @click="editHandler">修改</Button>
      <Button type="success" class="filter-item" icon="md-cloud-download" @click="exportHandler">导出</Button>
    </div>
    <div class="table">
      <Table :columns="columns" stripe :data="result" size="small"></Table>
    </div>
    <pageControl></pageControl>
  </div>
</template>

<script>
import pageControl from './pageControl'
// import CRUD from './crud'
export default {
  props: {},
  data () {
    return {
      query: {
        name: "",
        time: [],
        status: ''
      },
      options: {
        shortcuts: [
          {
            text: '近一周',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: '近一个月',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: '近三个月',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '年龄',
          key: 'age',
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return (
              "div", [
                h(
                  "Button",
                  {
                    props: {
                      type: 'info',
                      icon: 'ios-copy-outline',
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      "click": (params) => {
                        this.detailHandler()
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: 'warning',
                      icon: 'ios-create-outline'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      "click": (params) => {
                        this.editHandler()
                      }
                    }
                  },
                  "编辑"
                ),
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
                      "on-ok": (params) => {
                        this.deleteHandler()
                      },
                    },
                  },
                  [
                    h(
                      "Button",
                      {
                        props: {
                          type: 'error',
                          icon: 'md-trash'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          "click": (params) => {
                            
                          }
                        }
                      },
                      "删除"
                    )
                  ]
                ),
              ]
            )
          }
        },
      ],
      result: [
        {
          id: '1',
          name: '1',
          age: '2',
          address: '3'
        },
        {
          id: '2',
          name: '4',
          age: '5',
          address: '6'
        },
        {
          id: '3',
          name: '1',
          age: '2',
          address: '3'
        },
        {
          id: '4',
          name: '4',
          age: '5',
          address: '6'
        },
      ],
    };
  },
  cruds() {

  },
  components: {
    pageControl
  },
  computed: {},
  methods: {
    resetQuery() {
      alert('重置')
      this.query = {
        name: "",
        time: [],
        status: ''
      }
      this.queryHandler()
    },
    queryHandler() {
      alert('查询')
    },
    addHandler() {
      alert('新增')
    },
    editHandler() {
      alert('编辑')
    },
    exportHandler() {
      alert('导出')
    },
    detailHandler() {
      alert('详情')
    },
    deleteHandler() {
      alert('删除')
    },
  },
  watch: {},
  mounted() {
    this.queryHandler()
    console.log(this)
  },
  created() {},
}
</script>

<style scoped lang="stylus">
.filter-item{
  display: inline-block;
  vertical-align: middle;
  margin: 0 5px 10px 0;
  input {
    height: 30.5px;
    line-height: 30.5px;
  }
}
</style>