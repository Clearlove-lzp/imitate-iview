<template>
  <Modal v-model="visible" title="活动详情" width="900" footer-hide class-name="vertical-center-modal" @on-cancel="modalCancel">
    <div class="imitate-table" style="margin-bottom: 10px;">
      <table>
        <tr>
          <td>省份</td>
          <td>{{AppliForm.province}}</td>
          <td>地市</td>
          <td>{{AppliForm.city}}</td>
        </tr>
        <tr>
          <td>活动主题</td>
          <td colspan="3">{{AppliForm.activityTheme}}</td>
        </tr>
        <tr>
          <td>活动描述</td>
          <td colspan="3">
            <div style="maxHeight: 200px; overflow: auto">
              {{AppliForm.description}}
            </div>
          </td>
        </tr>
        <tr>
          <td>活动时间</td>
          <td>{{AppliForm.activityTime}}</td>
          <td>创建时间</td>
          <td>{{AppliForm.createTime}}</td>
        </tr>
        <tr>
          <td>填报人</td>
          <td>{{AppliForm.createUser}}</td>
          <td>填报人部门</td>
          <td>{{AppliForm.createUserDept}}</td>
        </tr>
      </table>
    </div>
  </Modal>
</template>

<script>
import { reactive, onMounted, ref, computed } from "@vue/composition-api"
import { useModal, useForm, useLoading } from '@/hook/index'

export default {
  props: {},
  components: {},
  setup(props, { emit }) {

    const { visible, showModal, closeModal } = useModal() // 模态框

    const AppliForm = ref({})

    const modalCancel = () => {
      AppliForm.value = {};
      closeModal()
    }

    const onOpen = (data) => {
      AppliForm.value = data;
      showModal()
    }

    return{
      visible,
      AppliForm,
      modalCancel,
      onOpen
    }
  }
}


</script>
<style lang="stylus" scoped>
/deep/.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal{
    top: 0;
    .ivu-modal-content{
      .ivu-modal-header{
        padding: 10px;
      }
      .ivu-modal-body{
        padding: 10px;
        .content{
          // height: 520px;
        }
      }
      .ivu-modal-footer{
        padding: 10px;
      }
    }
  }
}

.demo-upload-list{
  display: inline-block;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.demo-upload-list img{
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>


