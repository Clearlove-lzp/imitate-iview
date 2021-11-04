<!-- 树状下拉选择器 -->
<template>
  <div class="treeSelectPage">
    <Form ref="treeSelectPage" :model="formItem" :label-width="100" :rules="ruleValidate">
      <FormItem label="iview多选" prop="treeSelectedMultiple">
        <tree-select
          v-model="formItem.treeSelectedMultiple"
          style="width: 400px;"
          check-strictly
          :expand-all="true"
          :load-data="loadData"
          @on-change="handleTreeSelectChange"
          @on-toggle-expand="handleTreeSelectExpand"
          @on-check-change="handleTreeSelectCheckChange"
          @on-select-change="handleTreeSelectClick"
          :data="treeData"
        ></tree-select>
        <Button @click="changeTreeSelectData">更新选中数据</Button>
        <Button @click="changeTreeData">更新树数据</Button>
      </FormItem>
    </Form>
    <div class="checkBtn">
      <Button type="primary" @click="handleSubmit">检查</Button>
    </div>
  </div>
</template>

<script>
import TreeSelect from './tree-select';

export default {
  props: {},
  data () {
    return {
      formItem: {
        treeSelectedMultiple: [],
      },
      treeData: [
        {
          id: '1',
          title: '1',
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
        treeSelectedMultiple: [
          { required: true, type: 'array', min: 1, message: '至少选择一项', trigger: 'change' }
        ],
      }
    };
  },
  components: {
    TreeSelect,
  },
  computed: {},
  methods: {
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
      this.formItem.treeSelectedMultiple = ['111', '114']
    },
    changeTreeData () {
      this.treeData = this.newTreeData
      // this.formItem.treeSelectedMultiple = [];
    },
    handleTreeSelectChange (list) {
      // console.log('=-========', list);
    },
    handleTreeSelectExpand (item) {
      // console.log('toggle expand', item);
    },
    handleTreeSelectCheckChange (selectedArray, item) {
      // console.log(selectedArray, item);
    },
    handleTreeSelectClick (selectArray, item) {
      // console.log(selectArray, item);
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