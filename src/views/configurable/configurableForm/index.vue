<!-- 可配置表单 -->
<template>
  <div class="configurableForm">
    <Form ref="formRef" class="cdp-form" :rules="ruleValidate" :model="AppliForm" :label-width="120">
      <Row :gutter="10">
        <Col span="12" v-for="(x, i) in formJson" :key="x.key">
          <FormItem :label="x.title" :prop="x.key" :rules="x.rules">
            <Input v-if="x.category === 'Input'" class="cdp-input" :disabled="x.disabled" :type="x.type"
              :maxlength="x.maxlength" :show-word-limit="x.showWordLimit"
              v-model="AppliForm[x.key]" :placeholder="x.placeholder"
              :readonly="x.readonly" :password="x.password"
              :number="x.number" :clearable="x.clearable"
              :rows="x.rows" :autosize="x.autosize"></Input>
            <DatePicker v-if="x.category === 'DatePicker'" :disabled="x.disabled"
              v-model="AppliForm[x.key]" :placeholder="x.placeholder" :format="x.format"></DatePicker>
            <Radio v-if="x.category === 'Radio'" :disabled="x.disabled"
              v-model="AppliForm[x.key]" :trueValue="x.trueValue" :falseValue="x.falseValue" :border="x.border"></Radio>
            <RadioGroup v-if="x.category === 'RadioGroup'" v-model="AppliForm[x.key]"
              :type="x.type" :buttonStyle="x.buttonStyle">
              <Radio v-for="(y, j) in x.children" :key="y.title" :label="y.title" :border="y.border" :disabled="y.disabled"></Radio>
            </RadioGroup>
            <Checkbox v-if="x.category === 'Checkbox'" :disabled="x.disabled"
              v-model="AppliForm[x.key]" :trueValue="x.trueValue" :falseValue="x.falseValue" :border="x.border" :indeterminate="x.indeterminate"></Checkbox>
            <CheckboxGroup v-if="x.category === 'CheckboxGroup'" v-model="AppliForm[x.key]">
              <Checkbox v-for="(y, j) in x.children" :key="y.title" :label="y.title" :border="y.border" :disabled="y.disabled"></Checkbox>
            </CheckboxGroup>
            <i-switch v-if="x.category === 'Switch'" :disabled="x.disabled"
              v-model="AppliForm[x.key]" :trueValue="x.trueValue" :falseValue="x.falseValue" :trueColor="x.trueColor" :falseColor="x.falseColor"></i-switch>
            <Select v-if="x.category === 'Select'" v-model="AppliForm[x.key]" :multiple="x.multiple" :disabled="x.disabled"
              :clearable="x.clearable" :filterable="x.filterable" :placeholder="x.placeholder" :placement="x.placement"
              :max-tag-count="x.maxTagCount" :allow-create="x.allowCreate">
              <Option v-for="(y, j) in x.children" :key="y.title" :value="y.title" :disabled="y.disabled"></Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "@vue/composition-api"
import { usePage, useLoading, useForm, useModal, useState } from '@/hook/index.js';

const formJson = [
  {
    title: "省份",
    category: "Input",
    type: "text",
    key: "province",
    disabled: true,
    placeholder: ""
  },
  {
    title: "活动主题",
    category: "Input",
    type: "text",
    key: "activityTheme",
    disabled: false,
    placeholder: "请输入活动主题",
    maxlength: 100,
    showWordLimit: true,
    rules: {required: true, message: '不能为空', trigger: 'blur'}
  },
  {
    title: "活动时间",
    category: "DatePicker",
    type: "datetime",
    key: "activityTime",
    disabled: false,
    placeholder: "请选择时间",
    format: "yyyy-MM-dd HH:mm:ss"
  },
  {
    title: "活动描述",
    category: "Input",
    type: "textarea",
    key: "description",
    disabled: false,
    placeholder: "请输入活动描述",
    maxlength: 1000,
    showWordLimit: true,
    autosize: { minRows: 2, maxRows: 6 }
  },
  {
    title: "Radio",
    category: "Radio",
    key: "Radio",
    disabled: false,
    trueValue: true,
    falseValue: false,
    border: false
  },
  {
    title: "RadioGroup",
    category: "RadioGroup",
    type: "button",
    key: "RadioGroup",
    vertical: false,
    buttonStyle: "solid",
    children: [
      {
        title: "Radio1",
        border: false
      },
      {
        title: "Radio2",
        border: false
      },
      {
        title: "Radio3",
        border: false
      },
    ]
  },
  {
    title: "Checkbox",
    category: "Checkbox",
    key: "Checkbox",
    disabled: false,
    indeterminate: false,
    trueValue: true,
    falseValue: false,
    border: false
  },
  {
    title: "CheckboxGroup",
    category: "CheckboxGroup",
    type: "button",
    key: "CheckboxGroup",
    vertical: false,
    buttonStyle: "solid",
    children: [
      {
        title: "Checkbox1",
        border: true
      },
      {
        title: "Checkbox2",
        border: true
      },
      {
        title: "Checkbox3",
        border: true
      },
    ]
  },
  {
    title: "Switch",
    category: "Switch",
    key: "Switch",
    disabled: false,
    trueValue: true,
    falseValue: false,
    trueColor: "#13ce66",
    falseColor: "#ff4949",
  },
  {
    title: "Select",
    category: "Select",
    key: "Select",
    multiple: true,
    disabled: false,
    clearable: false,
    filterable: true,
    placeholder: "清选择",
    allowCreate: false,
    children: [
      {
        title: "Select1",
        disabled: false
      },
      {
        title: "Select2",
        disabled: false
      },
      {
        title: "Select3",
        disabled: false
      },
    ]
  },
]

const queryForm = {
  province: "",
  activityTheme: "",
  activityTime: "",
  description: "",
  Radio: "",
  RadioGroup: "",
  Checkbox: "",
  CheckboxGroup: [],
  Switch: false
}
const [ formRef, AppliForm, resetForm ] = useForm(queryForm);


const { pages, queryPageFunc, queryCurrentFunc, queryLimitFunc } = usePage(); // 分页器
</script>

<style scoped>
.configurableForm{
  margin-top: 10px;
}

.cdp-input{
  width: 100%;
}

</style>