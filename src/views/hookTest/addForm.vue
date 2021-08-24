<!-- 新增 -->
<template>
  <Modal v-model="value" :title="AppliForm.id ? '编辑' : '新增'" width="700px" 
    class-name="vertical-center-modal" :mask-closable="false" 
    @on-cancel="modalCancel" @on-visible-change="visibleChange">
    <div class="content">
      <Form ref="formRef" class="cdp-form" :rules="ruleValidate" :model="AppliForm" :label-width="90">
        <FormItem label="省份" prop="province">
          <Input class="cdp-input" v-model="AppliForm.province" placeholder="" disabled></Input>
        </FormItem>
        <FormItem label="活动主题" prop="activityTheme">
          <Input class="cdp-input" v-model="AppliForm.activityTheme" maxlength="100" show-word-limit placeholder="请输入活动主题"></Input>
        </FormItem>
        <FormItem label="活动时间" prop="activityTime">
          <DatePicker type="datetime" v-model="AppliForm.activityTime" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss" class="cdp-input"></DatePicker>
        </FormItem>
        <FormItem label="活动描述" prop="description">
          <Input class="cdp-input" type="textarea"  maxlength="1000" show-word-limit v-model="AppliForm.description" placeholder="请输入活动描述"></Input>
        </FormItem>
      </Form>
    </div>
    <div slot="footer" style="text-align: center">
      <Button @click="modalCancel">取消</Button>
      <Button type="primary" :loading="loading" @click="modalOK">确定</Button>
    </div>
  </Modal>
</template>

<script setup>
import { reactive, watch, defineEmits } from "@vue/composition-api"
import { useState, useForm } from '@/hook/index'
import { Message } from 'view-design';
const ruleValidate = {
  province: [
    { required: true, message: '省份不能为空', blur: 'blur'}
  ],
  city: [
    { required: true, message: '地市不能为空', blur: 'change'}
  ],
  activityTheme: [
    { required: true, message: '活动主题不能为空', blur: 'blur'},
  ],
  activityTime: [
    { 
      required: true, 
      type: 'date',
      message: '活动时间不能为空', 
      trigger: 'change', 
    },
  ],
  description: [
    { required: true, message: '活动描述不能为空', blur: 'blur'}
  ]
}

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  editInfo: {
    type: Object
  }
})
console.log(props)

const emit = defineEmits(['input', 'updateList'])
// export default {
//   props: {},
//   components: {},
//   setup(props, { emit }) {
    
    // 表单
    const EditForm = {
      id: "",
      province: '河南省',
      activityTheme: "",
      activityTime: "",
      description: ""
    }
    const {formRef, AppliForm, resetForm, validateForm} = useForm(EditForm);

    const visibleChange = (value) => { // 模态框开关
      if(value) {
        let data = props.editInfo;
        AppliForm.id = data.id ? data.id : "";
        if(data.id) {
          AppliForm.province = data.province
          AppliForm.activityTheme = data.activityTheme
          AppliForm.activityTime = new Date(data.activityTime)
          AppliForm.description = data.description
        }
      }
    }

    const modalCancel = () => { // 点击取消
      emit('input', false)
      resetForm(true);
    }

    const [ loading, setLoading ] = useState()
    const modalOK = async() => { //点击确定
      let boolean = await validateForm()
      if(!boolean) {
        return Message.error("请填写完整");
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        modalCancel()
        emit('updateList')
      }, 1000)
    }

//     return{
//       visible,
//       formRef,
//       ruleValidate,
//       AppliForm,
//       modalCancel,
//       modalOK,
//       loading,
//       onOpen
//     }
//   }
// }
</script>

<style scoped lang="stylus">
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

.cdp-input{
  width: 100%;
}

.page-container{
  text-align: right;
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