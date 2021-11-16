<!-- 特殊下拉框 -->
<template>
  <Select v-model="enumValue" :multiple="multiple" 
  :placeholder="placeholder" :disabled="disabled"
  :allowCreate="allowCreate"
  :maxTagCount="maxTagCount"
  :filterable="filterable"
  @on-change="onChange" clearable
  @on-create="createChange"
  @on-select="selectChange"
  @on-query-change="queryChange"
  @on-clear="clearChange"
  @on-open-change="openChange">
    <slot name="front"></slot>
    <Option v-for="item in datalist" :value="item.value" :key="item.value">{{ item.label }}</Option>
    <slot name="behind"></slot>
  </Select>
</template>

<script>
import { getType } from '@/api/index';
export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: ""
    },
    typeName: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    maxTagCount: {
      type: Number
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      datalist: [],
      enumValue: null
    };
  },
  components: {},
  computed: {
  },
  methods: {
    onChange(value) {
      this.$emit('input', value)
      this.$emit('on-change', value);
    },
    createChange(query) {
      this.datalist.push({
        id: query,
        value: query,
        label: query,
      })
      this.$emit('on-create', query);
    },
    selectChange(value) {
      this.$emit('on-select', value);
    },
    clearChange() {
      this.$emit('on-clear');
    },
    openChange(value) {
      this.$emit('on-open-change', value);
    },
    queryChange(query) {
      this.$emit('on-query-change', query);
    },
    setlist() {
      let arr = [];
      if(typeof this.enumValue === 'number' || typeof this.enumValue === 'string') {
        arr = String(this.enumValue).split(';;;?')
      }else{
        arr = this.enumValue;
      }
      arr.map(x => {
        let idx = this.datalist.findIndex(y => {
          return x === y.value;
        })
        if(idx < 0) {
          this.createChange(x)
        }
      })
    },
    query() {
      const params = `typeName=${this.typeName}`;
      getType(params).then(response => {
        let res = response.data;
        if(res.code === 200) {
          res.result.map(x => {
            this.datalist.push(x)
          })
        }
        if(this.enumValue && this.allowCreate) {
          this.setlist()
        }
      });
    },
  },
  watch: {
    value: {
  　　handler(newValue, oldValue) {
        this.enumValue = newValue;
        if(this.allowCreate && newValue) {
          this.setlist()
        }
  　　},
  　　immediate: true
    },
  },
  mounted() {
  },
  created() {
    this.query()
  },
}
</script>

<style scoped>
/* .cdp-input{
  width: 100%;
} */
</style>