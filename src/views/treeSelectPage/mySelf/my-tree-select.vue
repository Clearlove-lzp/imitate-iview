<!-- treeselect 组件 封装 -->
<template>
  <Select
    ref="treeSelect" class="tree-select"
    :multiple="multiple" :disabled="disabled"
    :clearable="clearable" :placeholder="placeholder"
    :maxTagCount="maxTagCount">
    <Tree :data="data"
      ref="treeChild"
      :multiple="multiple"
      :show-checkbox="showCheckbox"
      :check-strictly="checkStrictly"
      :check-directly="checkDirectly"
      :load-data="loadData"
      :select-node="selectNode"
      :expand-node="expandNode"
      @on-toggle-expand="onToggleExpand"
      @on-check-change="onCheckChange"
      @on-select-change="onSelectChange"
    ></Tree>
  </Select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Array],
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    maxTagCount: {
      type: Number
    },
    data: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    loadData: Function,
    checkDirectly: {
      type: Boolean,
      default: false
    },
    selectNode: {
      type: Boolean,
      default: false
    },
    expandNode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {
    onToggleExpand(item) {
      this.$emit('on-toggle-expand', item)
    },
    onCheckChange(selection, item) {
      this.$emit('on-check-change', selection, item)
      this.$emit('on-change', selection)
    },
    onSelectChange(selection, item) {
      this.$emit('on-select-change', selection, item)
      this.$emit('on-change', selection)
    }
  },
  watch: {},
  mounted() {},
  created() {},
}
</script>

<style scoped lang="stylus">
.tree-select {
  .ivu-select-dropdown {
    padding: 0 6px;
  }
}
</style>