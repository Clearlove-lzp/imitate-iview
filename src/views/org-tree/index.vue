<template>
  <Card shadow style="height: 100%;width: 100%;overflow:hidden">
    <div class="department-outer">
      <div class="tip-box">
        <b style="margin-right: 20px;">powered by <a target="blank" href="https://github.com/lison16">Lison</a></b>
        <a target="blank" href="https://github.com/lison16/v-org-tree" style="margin-right: 10px;">v-org-tree文档</a>
      </div>
      <div class="zoom-box">
        <zoom-controller v-model="zoom" :min="20" :max="200"></zoom-controller>
      </div>
      <div class="view-box">
        <org-view
          v-if="data"
          :data="data"
          :zoom-handled="zoomHandled"
          @on-menu-click="handleMenuClick"
        ></org-view>
      </div>
    </div>
  </Card>
</template>

<script>
import OrgView from './components/org-view.vue'
import ZoomController from './components/zoom-controller.vue'
const menuDic = {
  edit: '编辑部门',
  detail: '查看部门',
  new: '新增子部门',
  delete: '删除部门'
}
export default {
  name: 'org_tree_page',
  components: {
    OrgView,
    ZoomController
  },
  data () {
    return {
      data: {
        id: 0,
        label: 'XXX科技有限公司',
        children: [
          {
            id: 2,
            label: '产品研发部',
            children: [
              {
                id: 5,
                label: '研发-前端'
              }, {
                id: 6,
                label: '研发-后端'
              }, {
                id: 9,
                label: 'UI设计'
              }, {
                id: 10,
                label: '产品经理'
              }
            ]
          },
          {
            id: 3,
            label: '销售部',
            children: [
              {
                id: 7,
                label: '销售一部'
              }, {
                id: 8,
                label: '销售二部'
              }
            ]
          },
          {
            id: 4,
            label: '财务部'
          }, {
            id: 11,
            label: 'HR人事'
          }
        ]
      },
      zoom: 100
    }
  },
  computed: {
    zoomHandled () {
      return this.zoom / 100
    }
  },
  methods: {
    setDepartmentData (data) {
      data.isRoot = true
      return data
    },
    handleMenuClick ({ data, key }) {
      this.$Message.success({
        duration: 5,
        content: `点击了《${data.label}》节点的'${menuDic[key]}'菜单`
      })
    },
  },
  mounted () {
  }
}
</script>

<style lang="less">
@wrapper: ~'department';
.percent-100 {
  width: 100%;
  height: 100%;
}
.@{wrapper}-outer {
  .percent-100;
  overflow: hidden;
  .tip-box{
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 12;
  }
  .zoom-box {
    position: absolute;
    right: 30px;
    bottom: 30px;
    z-index: 2;
  }
  .view-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    cursor: move;
    .org-tree-drag-wrapper {
      width: 100%;
      height: 100%;
    }
    .org-tree-wrapper {
      display: inline-block;
      position: absolute;
      left: 50%;
      top: 50%;
      transition: transform 0.2s ease-out;
      .org-tree-node-label {
        box-shadow: 0px 2px 12px 0px rgba(143, 154, 165, 0.4);
        border-radius: 4px;
        .org-tree-node-label-inner {
          padding: 0;
          .custom-org-node {
            padding: 14px 41px;
            background: #738699;
            user-select: none;
            word-wrap: none;
            white-space: nowrap;
            border-radius: 4px;
            color: #ffffff;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            transition: background 0.1s ease-in;
            cursor: default;
            &:hover {
              background: #5d6c7b;
              transition: background 0.1s ease-in;
            }
            &.has-children-label {
              cursor: pointer;
            }
            .context-menu{
              position: absolute;
              right: -10px;
              bottom: 20px;
              z-index: 10;
            }
          }
        }
      }
    }
  }
}

</style>
