<!-- hook测试 -->
<template>
  <div class="dailySafe">
    <Card dis-hover :padding="10">
      <!-- 查询表单 -->
      <div class="cdp-form">
        <Form :model="AppliForm" label-position="right" :label-width="100">
          <Row style="margin-bottom: 10px" :gutter="10">
            <Col span="5">
              <Input v-model="AppliForm.activityTheme" class="cdp-input" placeholder="活动主题"></Input>
            </Col>
            <Col span="6">
              <DatePicker type="datetimerange" v-model="AppliForm.time" split-panels placeholder="活动时间" format="yyyy-MM-dd HH:mm:ss" class="cdp-input"></DatePicker>
            </Col>
            <Col span="4">
              <Input v-model="AppliForm.desc" class="cdp-input" placeholder="活动描述"></Input>
            </Col>
            <Col span="4">
              <Input v-model="AppliForm.createUser" class="cdp-input" placeholder="填报人"></Input>
            </Col>
            <Col span="5" align="left">
              <Button type="primary" @click="queryPageFunc(query)">查询</Button>
              <Button type="primary" @click="resetForm()">重置</Button>
              <Button type="success" @click="addFunc({})">新增</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <!-- 表格数据 -->
      <div class="cdp-table">
        <Table border :loading="loading" size="small" :height="430" stripe :columns="columns" :data="datalist">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="warning" size="small" style="margin-right: 5px" @click="addFunc(row)">修改</Button>
            <Button type="info" size="small" style="margin-right: 5px" @click="previewFunc(row)">详情</Button>
            <Poptip confirm transfer title="您确定要删除这条数据吗?" placement="top-end" @on-ok="deleteFunc(row)">
              <Button  type="error" size="small">删除</Button>
            </Poptip>
          </template>
        </Table>
        <div class="cdp-page">
          <Page
            @on-change="(value) => {queryCurrentFunc(value, query)}"
            :total="pages.total" 
            :page-size="pages.limit"
            :page-size-opts="[10, 20, 50]"
            @on-page-size-change="(value) => {queryLimitFunc(value, query)}"
            :current="pages.current"
            placement="top"
            show-total show-sizer />
        </div>
      </div>
    </Card>
    <addForm v-model="editVisible" :editInfo="editInfo" @updateList="query"></addForm>
    <detailModal v-model="detailVisible" :detailInfo="detailInfo"></detailModal>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "@vue/composition-api"
import { usePage, useLoading, useForm, useModal } from '@/hook/index.js';
import addForm from './addForm.vue'
import detailModal from './detailModal.vue'

const columns = [
  {
    title: "省份",
    key: "province",
    tooltip: true,
    width: 80,
  },
  {
    title: "地市",
    key: "city",
    tooltip: true,
    width: 90,
  },
  {
    title: "活动主题",
    key: "activityTheme",
    tooltip: true,
  },
  {
    title: "活动时间",
    width: 150,
    key: "activityTime",
  },
  {
    title: "活动描述",
    key: "description",
    tooltip: true
  },
  {
    title: "填报人",
    width: 90,
    key: "createUser"
  },
  {
    title: "填报人部门",
    width: 120,
    key: "createUserDept"
  },
  {
    title: "操作",
    key: "action",
    slot: 'action',
    width: 200,
    align: "center",
  }
]

// export default {
//   props: {},
//   components: {
//     addForm,
//     detailModal
//   },
//   setup(props, context) {

    // 查询表单
const queryForm = {
  activityTheme: "",
  time: [],
  desc: "",
  createUser: ""
}
const { AppliForm, resetForm } = useForm(queryForm)

const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器


const { loading, showLoading, closeLoading } = useLoading() // loading控制器


const datalist = ref([]);
// 查询  表格数据
const query = () => {
  let params = `currentPage=${pages.current}&pageSize=${pages.limit}`;
  if(AppliForm.time[0]) {
    params += `&activityTimeBegin=${new Date(AppliForm.time[0]).Format('yyyy-MM-dd hh:mm:ss')}`
    params += `&activityTimeEnd=${new Date(AppliForm.time[1]).Format('yyyy-MM-dd hh:mm:ss')}`
  }
  if(AppliForm.activityTheme) {
    params += `&activityTheme=${AppliForm.activityTheme}`;
  }
  if(AppliForm.desc) {
    params += `&desc=${AppliForm.desc}`;
  }
  if(AppliForm.createUser) {
    params += `&createUser=${AppliForm.createUser}`;
  }
}
onMounted(() => {
  query()
})

// 打开新增/编辑 模态框
const [editVisible, setEditVisible, editInfo, setEditInfo] = useModal()
const addFunc = (info) => {
  setEditInfo(info)
  setEditVisible(true)
}

// 打开详情 模态框
const [detailVisible, setDetailVisible, detailInfo, setDetailInfo] = useModal()
const previewFunc = (info) => {
  setDetailInfo(info)
  setDetailVisible(true)
}

// 删除
const deleteFunc = (info) => {
  queryPageFunc(query)
}

let str = "hah"

//     return{
//       pages,
//       queryPageFunc,
//       queryCurrentFunc,
//       queryLimitFunc,
//       query,
//       columns,
//       datalist,
//       loading,
//       AppliForm,
//       resetForm,
//       addFormRef,
//       addFunc,
//       detailRef,
//       previewFunc,
//       deleteFunc
//     }
//   }
// }
</script>

<style scoped>
.cdp-page{
  padding-top: 10px;
  text-align: right;
}

.dailySafe{
  margin-top: 10px;
}

.cdp-input{
  width: 100%;
}

</style>