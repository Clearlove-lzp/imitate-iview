<!-- 流程详情 -->
<template>
  <div class="process-detail">
    <div class="detail-title">
      <div class="icon">
        <Icon type="md-list-box" class="iconfont" color="#FFFFFF" size="20" />
      </div>
      <div class="title">根因初定界</div>
      <div class="tip">说明：表征专业响应调度，确认事件真实性，并反馈已知事件信息如根因、措施等</div>
      <Icon type="md-alarm" size="20" class="icon-time" />
      <div class="clock">05:23:32</div>
      <div class="supervisor‌">
        <Button icon="md-hammer" type="primary">督办</Button>
      </div>
    </div>
    <div class="detail-main">
      <div class="detail">
        <div class="last-process-detail">
          <div class="detail-item title">上一环节 - 【真实性确认】</div>
          <div class="detail-item time">2025-12-25 12:00:00 金佳-省公司</div>
          <div class="detail-item">事件真实性：是</div>
          <div class="detail-item">表征专业：传输；无线</div>
          <div class="detail-item">表征专业处理方：传输组</div>
        </div>
        <div class="reject-detail">
          <div class="detail-item title"><span class="reject">驳回信息</span> - 【根因定界确认】</div>
          <div class="detail-item time">2025-12-25 12:00:00 张三-宁波传动中心</div>
          <div class="detail-item">根因定界确认结果：驳回</div>
          <div class="detail-item long">根因确认说明：根因初定界结果需要进一步核实，建议重新评估根因专业</div>
        </div>
        <div class="assistant-info">
          <Collapse>
            <Panel name="1">
              其他辅助信息
              <div slot="content" class="assistant-detail">
                <div class="detail-item long title">原子能力名称</div>
                <div class="detail-item long">事件标题：标题</div>
                <div class="detail-item long">故障类型：类型</div>
                <div class="detail-item long">事件级别：四级</div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div class="submit-form">
        <Form ref="formValidate" :model="AppliForm" :rules="ruleValidate" :label-width="140">
          <FormItem label="初定界根因专业" prop="profession">
            <Input v-model="AppliForm.profession" clearable></Input>
          </FormItem>
          <FormItem label="根因定界说明" prop="tip">
            <Input v-model="AppliForm.tip" type="textarea" clearable></Input>
          </FormItem>
          <FormItem label="根因专业处理方" prop="handler">
            <Select v-model="AppliForm.handler" clearable>
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
        </Form>
        <div class="submit-btn">
          <Button>保存</Button>
          <Button type="primary" style="margin-left: 10px">提交进入下一环节</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {},
    data() {
      return {
        AppliForm: {
          profession: "",
          tip: "",
          handler: "",
        },
        ruleValidate: {
          profession: [{ required: true, message: "不能为空", trigger: "blur" }],
          tip: [{ required: true, message: "不能为空", trigger: "blur" }],
          handler: [{ required: true, message: "不能为空", trigger: "change" }],
        },
      };
    },
    components: {},
    computed: {},
    methods: {},
    watch: {},
    mounted() {},
    created() {},
  };
</script>

<style scoped></style>
