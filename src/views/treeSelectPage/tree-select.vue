<template>
  <Select
    ref="select"
    class="tree-select"
    v-bind="$attrs"
    @on-change="handleChange"
    :multiple="multiple">
    <tree-select-tree-multiple-item
      v-if="multiple"
      :selectedArray="value"
      :data="data"
      @on-clear="handleClear"
      :load-data="loadData"
      @on-check="handleTreeCheck"
    ></tree-select-tree-multiple-item>
    <TreeSelectTreeRadioItem
      v-else
      :selectedArray="value"
      :data="data"
      @on-clear="handleClear"
      :load-data="loadData"
      @on-check="handleTreeCheck"
    ></TreeSelectTreeRadioItem>
  </Select>
</template>

<script>
import Emitter from 'view-design/src/mixins/emitter.js'
import TreeSelectTreeMultipleItem from './tree-select-tree-multiple.vue'
import TreeSelectTreeRadioItem from './tree-select-tree-radio.vue'
export default {
  name: 'TreeSelect',
  mixins: [Emitter],
  components: {
    TreeSelectTreeMultipleItem,
    TreeSelectTreeRadioItem
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    loadData: Function
  },
  data () {
    return {
      isChangedByTree: true,
      isInit: true
    }
  },
  provide () {
    return {
      parent: this
    }
  },
  methods: {
    handleChange (selected) {
      if (!this.isChangedByTree) this.$emit('input', selected)
      this.isChangedByTree = false
    },
    handleTreeCheck (selectedArray) {
      this.isChangedByTree = true
      this.$emit('input', selectedArray.map(item => item.id))
    },
    handleClear () {
      this.$refs.select.reset()
    }
  }
}
</script>

<style lang="stylus" scoped>
.tree-select {
  .ivu-select-dropdown {
    padding: 0 6px;
  }
}
</style>
