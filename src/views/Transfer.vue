<!-- 穿梭框 -->
<template>
  <div>
    <Input search enter-button v-model="queryName" style="width: 350px" @on-search="queryNameHandler" placeholder="名称" />
    <Card style="margin-top: 10px">
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
              <li class="child-item" v-for="item in willData" :key="item.key" @dblclick.stop="dblToRight(item.key)">
                <Checkbox :label="item.key" @click.stop.native="()=>{}">{{item.title}}</Checkbox>
              </li>
            </CheckboxGroup>
          </ul>
        </div>
      </Col>
      <Col span="2" class="col2">
        <div class="arrow-box">
          <Button type="primary" class="arrow rotateArrow" icon="ios-skip-backward" :disabled="hasCheckList.length < 1" @click="toTop"></Button>
          <Button type="primary" class="arrow" icon="ios-arrow-up" :disabled="hasCheckList.length !== 1" @click="toUp"></Button>
          <Button type="primary" class="arrow" icon="ios-arrow-back" :disabled="hasCheckList.length < 1" @click="toLeft"></Button>
          <Button type="primary" class="arrow" icon="ios-arrow-forward" :disabled="willCheckList.length < 1" @click="toRight"></Button>
          <Button type="primary" class="arrow" icon="ios-arrow-down" :disabled="hasCheckList.length !== 1" @click="toDown"></Button>
          <Button type="primary" class="arrow rotateArrow" icon="ios-skip-forward" :disabled="hasCheckList.length < 1" @click="toBottom"></Button>
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
              <li class="child-item" v-for="item in hasData" :key="item.key" @dblclick.stop="dblToLeft(item.key)">
                <Checkbox :label="item.key" @click.stop.native="()=>{}">{{item.title}}</Checkbox>
              </li>
            </CheckboxGroup>
          </ul>
        </div>
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
      willCheckAll: false,
      willCheckList: [],
      hasCheckAll: false,
      hasCheckList: [],
      targetKeys: [],
      data1: [
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
          title: "创建时间",
          width: 150,
          key: "createTime",
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
        }
      ]
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
      this.targetKeys.map(item => {
        this.data1.map(item1 => {
          if(item === item1.key) {
            arr.push(item1)
          }
        })
      })
      return arr
      // this.data1.forEach(item => {
      //   if(this.targetKeys.includes(item.key)) {
      //     arr.push(item)
      //   }
      // })
      // return arr
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
      this.targetKeys = this.targetKeys.concat(this.willCheckList);
      if(this.hasCheckAll) {
        this.hasCheckList = this.hasCheckList.concat(this.willCheckList);
      }
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
      if(this.willCheckAll) {
        this.willCheckList = this.willCheckList.concat(this.hasCheckList);
      }
      this.hasCheckAll = false
      this.hasCheckList = []
    },
    swapItems(arr, index1, index2){
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
    toUp() {
      this.hasCheckList.map(x => {
        let idx = this.targetKeys.findIndex(y => {
          return y === x;
        })
        if(idx > 0) {
          this.targetKeys = this.swapItems(this.targetKeys, idx, idx - 1);
        }
      })
      this.$forceUpdate()
    },
    toDown() {
      this.hasCheckList.map(x => {
        let idx = this.targetKeys.findIndex(y => {
          return y === x;
        })
        if(idx < this.targetKeys.length - 1) {
          this.targetKeys = this.swapItems(this.targetKeys, idx, idx + 1);
        }
      })
      this.$forceUpdate()
    },
    toTop() {
      this.targetKeys = [...new Set(this.hasCheckList.concat(this.targetKeys))]
    },
    toBottom() {
      let obj = {};
      this.targetKeys = this.targetKeys.concat(this.hasCheckList).reduceRight((cur, next) => {
        obj[next] ? "" : obj[next] = true && cur.push(next);
        return cur
      }, []).reverse()
    },
    dblToRight(data) {
      // let arr = [data]
      // this.targetKeys = this.targetKeys.concat(arr)
      // if(this.hasCheckAll) {
      //   this.hasCheckList = this.hasCheckList.concat(arr);
      // }
      // for(let i = 0; i < arr.length; i++) {
      //   for(let j = 0; j < this.willCheckList.length; j ++) {
      //     if(this.willCheckList[j] === arr[i]) {
      //       this.willCheckList.splice(j, 1);
      //       break;
      //     }
      //   }
      // }
      // if(this.willCheckList.length === 0) {
      //   this.willCheckAll = false
      // }
    },
    dblToLeft(data) {
      // let arr = [data]
      // for(let i = 0; i < arr.length; i++) {
      //   for(let j = 0; j < this.targetKeys.length; j ++) {
      //     if(this.targetKeys[j] === arr[i]) {
      //       this.targetKeys.splice(j, 1);
      //       break;
      //     }
      //   }
      //   for(let j = 0; j < this.hasCheckList.length; j ++) {
      //     if(this.hasCheckList[j] === arr[i]) {
      //       this.hasCheckList.splice(j, 1);
      //       break;
      //     }
      //   }
      // }
      // if(this.hasCheckList.length === 0) {
      //   this.hasCheckAll = false;
      // }
      // if(this.willCheckAll) {
      //   this.willCheckList = this.willCheckList.concat(arr);
      // }
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
    margin-bottom: 12px;
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
  .rotateArrow{
    transform: rotate(90deg);
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