<!-- 穿梭框 -->
<template>
  <div>
    <Input search enter-button v-model="queryName" style="width: 350px" @on-search="queryNameHandler" placeholder="名称" />
    <Card style="margin-top: 10px">
      <Row>
        <Col span="8">
          <div style="width:95%;max-height: 340px;overflow-y: auto">
            <Tree @on-select-change="selectItem" :data="data2" style="height: 340px"></Tree>
          </div>
        </Col>
        <Col span="16">
          <Row>
            <Col span="11">
              <div class="box-container left-box">
                <div class="top-info">
                  <div>
                    <Checkbox v-model="willCheckAll" :disabled="data1.length < 1" @on-change="handleWillCheckAll">待选择</Checkbox>
                  </div>
                  <div>
                    <span v-show="willCheckList.length > 0">{{willCheckList.length}}/</span>
                    <span>{{willData.length}}</span>
                  </div>
                </div>
                <ul class="childName">
                  <CheckboxGroup v-model="willCheckList" @on-change="checkWillAllGroupChange">
                    <li class="child-item" v-for="(item, index) in willData" :key="index" @dblclick.stop="dblToRight(item.key)">
                      <Checkbox :label="item.key">{{item.label}}</Checkbox>
                    </li>
                  </CheckboxGroup>
                </ul>
              </div>
            </Col>
            <Col span="2" class="col2">
              <div class="arrow-box">
                <Button type="primary" class="arrow" icon="ios-arrow-back" :disabled="hasCheckList.length < 1" @click="toLeft"></Button>
                <Button type="primary" class="arrow" icon="ios-arrow-forward" :disabled="willCheckList.length < 1" @click="toRight"></Button>
              </div>
            </Col>
            <Col span="11">
              <div class="box-container right-box">
                <div class="top-info">
                  <div>
                    <Checkbox v-model="hasCheckAll" @on-change="handleHasCheckAll">已选择</Checkbox>
                  </div>
                  <div>
                    <span v-show="hasCheckList.length > 0">{{hasCheckList.length}}/</span>
                    <span>{{targetKeys.length}}</span>
                  </div>
                </div>
                <ul class="childName">
                  <CheckboxGroup v-model="hasCheckList" @on-change="checkHasAllGroupChange">
                    <li class="child-item" v-for="(item, index) in hasData" :key="index" @dblclick.stop="dblToLeft(item.key)">
                      <Checkbox :label="item.key">{{item.label}}</Checkbox>
                    </li>
                  </CheckboxGroup>
                </ul>
              </div>
            </Col>
          </Row>
          <!-- <Transfer
            :data="data1"
            :titles="titlesList"
            :list-style="listStyle"
            :target-keys="targetKeys"
            :render-format="render1"
            @on-change="handleChange1"
          ></Transfer> -->
          <Spin fix v-if="showLoading">加载中...</Spin>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>

export default {
  props: {},
  data () {
    return {
      queryName: "",
      data2: [],
      showLoading: false,
      show: {
        type: "JOINT"
      },
      willCheckAll: false,
      willCheckList: [],
      hasCheckAll: false,
      hasCheckList: [],
      leftArray: [],
      targetKeys: [],
      data1: []
    };
  },
  components: {},
  computed: {
    willData() {
      let arr = []
      this.data1.forEach(item => {
        if(!this.targetKeys.includes(item.key)) {
          arr.push(item)
        }
      })
      return arr
    },
    hasData() {
      let arr = []
      this.data1.forEach(item => {
        if(this.targetKeys.includes(item.key)) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  methods: {
    //输入框查询
    queryNameHandler() {
      if(!this.queryName || !this.queryName.trim()) {
        return;
      }
      let param = {
        userName: this.queryName
      }
    },
    //树节点选择
    selectItem(item) {
      let param = {};
      if (item.length > 0) {
        param = {
          orgId: item[0].id
        }
      }
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr) && res.set(arr, 1));
    },
    checkWillAllGroupChange(data) {
      if(data.length === this.willData.length) {
        this.willCheckAll = true
      }else{
        this.willCheckAll = false
      }
    },
    checkHasAllGroupChange(data) {
      if(data.length === this.hasData.length) {
        this.hasCheckAll = true
      }else{
        this.hasCheckAll = false
      }
    },
    handleWillCheckAll(value) {
      if(value) {
        this.willCheckList = []
        this.willData.forEach(item => {
          this.willCheckList.push(item.key)
        })
      }else{
        this.willCheckList = []
      }
    },
    handleHasCheckAll(value) {
      if(value) {
        this.hasCheckList = []
        this.hasData.forEach(item => {
          this.hasCheckList.push(item.key)
        })
      }else{
        this.hasCheckList = []
      }
    },
    toRight() {
      this.targetKeys = this.willCheckList.concat(this.targetKeys)
      this.willCheckAll = false
      this.willCheckList = []
    },
    toLeft() {
      for(let i = 0; i < this.hasCheckList.length; i++) {
        for(let j = 0; j < this.targetKeys.length; j ++) {
          if(this.targetKeys[j] === this.hasCheckList[i]) {
            this.targetKeys.splice(j, 1);
            break;
          }
        }
      }
      this.hasCheckAll = false
      this.hasCheckList = []
    },
    dblToRight(data) {
      this.targetKeys = [data].concat(this.targetKeys)
      this.willCheckAll = false
      this.willCheckList = []
    },
    dblToLeft(data) {
      let arr = [data]
      for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < this.targetKeys.length; j ++) {
          if(this.targetKeys[j] === arr[i]) {
            this.targetKeys.splice(j, 1);
            break;
          }
        }
      }
      this.hasCheckAll = false
    }
  },
  watch: {},
  mounted() {
  },
  created() {},
}
</script>

<style scoped lang="stylus">
.box-container{
  border: 1px solid #dcdee2;
  border-radius: 5px;
  height: 340px;
  // display: inline-block;
  vertical-align: middle;
}
.top-info{
  display flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #dcdee2;
  background-color: #f9fafc;
}
.col2{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 340px;
}

.arrow-box{
  margin: 0 16px;
  .arrow{
    display: block;
    min-width: 24px;
    &:nth-of-type(1) {
      margin-bottom: 12px;
    }
  }
}

.childName{
  height: 298px;
  overflow: auto;
}

.child-item {
  padding: 10px;
  text-align: left;
  &:hover{
    background-color: #f3f3f3;
  }
}

/deep/.ivu-checkbox{
  margin-right: 5px;
}
</style>