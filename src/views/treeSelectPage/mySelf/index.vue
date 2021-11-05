<!-- 树状下拉选择器 -->
<template>
  <div class="treeSelectPage">
    <Form ref="treeSelectPage" :model="formItem" :label-width="100" :rules="ruleValidate">
      <FormItem label="魔改多选" prop="myTreeSelectMultiple">
        <my-tree-select
          v-model="formItem.myTreeSelectMultiple"
          style="width: 400px;"
          multiple
          show-checkbox
          check-strictly
          check-directly
          :data="treeData"
          :load-data="loadData"
          select-node
          expand-node
          @on-change="onChange"
          @on-toggle-expand="handleTreeSelectExpand"
          @on-check-change="handleTreeSelectCheckChange"
          @on-select-change="handleTreeSelectClick"
        ></my-tree-select>
      </FormItem>
    </Form>
    <div class="checkBtn">
      <Button type="primary" @click="handleSubmit">检查</Button>
    </div>
  </div>
</template>

<script>
import myTreeSelect from './my-tree-select';

export default {
  props: {},
  data () {
    return {
      formItem: {
        myTreeSelectMultiple: [],
        myTreeSelectRadio: ""
      },
      treeData: [
        {
          id: '1',
          title: '1',
          expand: true,
          children: [
            {
              id: '11',
              title: '1-1',
              loading: false,
              children: [
              ]
            },
            {
              id: '12',
              title: '1-2',
              children: [
                {
                  id: '121',
                  title: '1-2-1'
                }
              ]
            }
          ]
        }
      ],
      newTreeData: [
        {
          id: 'a',
          title: 'a',
          expand: true,
          children: [
            {
              id: 'a1',
              title: 'a-1',
              children: [
                {
                  id: '112',
                  title: '1-1-2'
                },
                {
                  id: 'a12',
                  title: 'a-1-2'
                },
                {
                  id: 'a13',
                  title: 'a-1-3'
                },
                {
                  id: 'a14',
                  title: 'a-1-4'
                }
              ]
            },
            {
              id: 'a2',
              title: 'a-2',
              children: [
                {
                  id: 'a21',
                  title: 'b-2-1'
                }
              ]
            }
          ]
        }
      ],
      ruleValidate: {
        myTreeSelectMultiple: [
          { required: true, type: 'array', min: 1, message: '至少选择一项', trigger: 'change' }
        ],
        myTreeSelectRadio: [
          { required: true, type: 'string', message: '选择一项', trigger: 'change' }
        ]
      }
    };
  },
  components: {
    myTreeSelect
  },
  computed: {},
  methods: {
    changes(value) {
      console.log(value)
    },
    handleSubmit () {
      this.$refs.treeSelectPage.validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    changeTreeSelectData () {
      this.formItem.myTreeSelectMultiple = ['111', '114']
    },
    changeTreeData () {
      this.treeData = this.newTreeData
    },
    handleTreeSelectChange (list) {
      // console.log('=-========', list);
    },
    onChange(value) {
      console.log('on-change', value)
    },
    handleTreeSelectExpand (item) {
      console.log('展开和收起子列表时触发', item);
    },
    handleTreeSelectCheckChange (selection, item) {
      console.log('点击复选框时触发', selection, item);
    },
    handleTreeSelectClick (selection, item) {
      console.log('点击树节点时触发', selection, item);
    },
    loadData (item, callback) {
      setTimeout(() => {
        let data = [
          {
            id: '111',
            title: '1-1-1'
          },
          {
            id: '112',
            title: '1-1-2'
          },
          {
            id: '113',
            title: '1-1-3'
          },
          {
            id: '114',
            title: '1-1-4'
          }
        ]
        callback(data)
      }, 1000)
    }
  },
  watch: {},
  mounted() {},
  created() {},
}
</script>

<style scoped>
.checkBtn{
  margin-top: 20px;
}
</style>