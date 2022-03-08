<!-- treeselect 组件 封装 -->
<template>
  <Select
    :ref="`treeSelect-${_uid}`" class="tree-select"
    :multiple="multiple"
    v-bind="$attrs"
    @on-change="handleChange">
    <treeSelectTreeMultiple
      v-if="multiple"
      :data="data"
      :selectedArray="value"
      :load-data="loadData"
      @on-check="onCheckChange"
      @on-clear="onClear"
    ></treeSelectTreeMultiple>
    <treeSelectTreeRadio
      v-else
      :data="data"
      :selectedId="value"
      :load-data="loadData"
      @on-check="onCheckChange"
      @on-clear="onClear"
    ></treeSelectTreeRadio>
  </Select>
</template>

<script>
import Emitter from 'view-design/src/mixins/emitter.js'
import treeSelectTreeMultiple from './tree-select-tree-multiple';
import treeSelectTreeRadio from './tree-select-tree-radio';

export default {
  props: {
    value: {
      type: [String, Array, Number],
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    loadData: Function,
  },
  mixins: [Emitter],
  data () {
    return {
      isChangedByTree: true,
    };
  },
  provide () {
    return {
      parent: this
    }
  },
  components: {
    treeSelectTreeMultiple,
    treeSelectTreeRadio
  },
  computed: {},
  methods: {
    handleChange (selection) {
      if (!this.isChangedByTree) {
        this.$emit('input', selection);
      }
      this.isChangedByTree = false
    },
    onCheckChange(selection) {
      this.isChangedByTree = true
      if(this.multiple) {
        this.$emit('input', selection.map(x => x.id));
      }else{
        this.$emit('input', selection.length ? selection[0].id : "");
      }
    },
    onClear () {
      this.$refs[`treeSelect-${this._uid}`].reset()
    }
  },
  watch: {
  },
  mounted() {
    console.log(this)
  },
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