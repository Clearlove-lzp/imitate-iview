<template>
  <Tree :data="data"
    v-bind="parent.$attrs"
    :load-data="loadDataCallback"
    v-on="parent.$listeners"
    @on-select-change="onSelectChange"
  ></Tree>
</template>

<script>
import Emitter from 'view-design/src/mixins/emitter.js'

const arrayEqual = (arr1, arr2) => {
  // 判断数组的长度
  if (arr1.length !== arr2.length) {
    return false
  } else {
    // 循环遍历数组的值进行比较
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }
    return true
  }
}

export default {
  name: 'TreeSelectTree',
  mixins: [Emitter],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    selectedId: {
      type: [String, Number],
      default: ""
    },
    loadData: Function,
  },
  data () {
    return {
      flatDic: {},
      checkedArray: []
    }
  },
  inject: ['parent'],
  computed: {
    expandAll () {
      return this.parent.$attrs['expand-all']
    }
  },
  watch: {
    data (newData, oldVal) {
      this.updateFlagDic(newData)
      let selectArray = []
      if (this.selectedId in this.flatDic) selectArray.push(this.selectedId)
      this.$emit('on-check', selectArray.map(id => this.flatDic[id]))
      if (this.expandAll) this.checkData(newData, false, true)
    },
    selectedId (newVal, oldVal) {
      if (newVal === oldVal) return
      const filtedNewVal = [newVal].filter(id => id in this.flatDic)
      this.$emit('on-check', filtedNewVal.map(id => this.flatDic[id]))
      this.$emit('on-clear')
      this.$nextTick(() => {
        this.checkData(this.data, true)
      })
    }
  },
  methods: {
    checkEmit (value, label) {
      this.dispatch('iSelect', 'on-select-selected', {
        value,
        label
      })
      this.$emit('on-select-selected', {
        value,
        label
      })
    },
    updateFlagDic (newData) {
      let newFlagDic = {}
      this.setFlagDic(newData, item => {
        newFlagDic[item.id] = item
      })
      this.flatDic = newFlagDic
    },
    setFlagDic (data, callback) {
      data.forEach(item => {
        if (item.children && item.children.length) { this.setFlagDic(item.children, callback) }
        callback(item)
      })
    },
    onSelectChange(selection, item) {
      this.$emit('on-check', selection, item);
      this.parent.$emit('on-change', selection.length ? selection[0].id : "");
    },
    checkData (data, emit, expandAll) {
      data.forEach(item => {
        if (this.selectedId === item.id) {
          this.$set(item, 'selected', true)
          this.checkedArray.push(item)
          if (emit) this.checkEmit(item.id, item.title)
        } else this.$set(item, 'selected', false)
        if (item.children && item.children.length) {
          if (this.expandAll && expandAll) this.$set(item, 'expand', true)
          this.checkData(item.children, emit, expandAll)
        }
      })
    },
    loadDataCallback (item, callback) {
      this.loadData(item, data => {
        return (() => {
          callback(data)
          this.updateFlagDic(this.data)
        })(data)
      })
    },
  },
  mounted () {
    this.checkData(this.data, false, true);
    this.$nextTick(() => {
      this.$emit('on-check', this.checkedArray)
    })
  }
}
</script>

<style></style>
