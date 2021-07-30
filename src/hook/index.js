
import { ref, reactive, onMounted, nextTick, computed, provide, inject, getCurrentInstance } from '@vue/composition-api';
import _ from 'lodash';
import echarts from 'echarts';
 
export const useLoading = () => { // loading状态
  const loading = ref(false);
  const showLoading = () => {
    loading.value = true;
  }
  const closeLoading = () => {
    loading.value = false;
  }
  return {
    loading,
    showLoading,
    closeLoading
  }
}

export const useModal = () => { // 模态框开关
  const { loading, showLoading, closeLoading } = useLoading()
  const visible = ref(false);
  const showModal = () => {
    visible.value = true;
  }
  const closeModal = () => {
    visible.value = false;
  }
  return {
    visible,
    showModal,
    closeModal,
    loading,
    showLoading,
    closeLoading
  }
}

export const usePage = () => { // 分页
  const pages = reactive({
    current: 1,
    limit: 10,
    total: 0
  })
  const queryPageFunc = (callback) => {
    pages.current = 1;
    callback && callback()
  }
  const queryCurrentFunc = (value, callback) => {
    pages.current = value;
    callback && callback()
  }
  const queryLimitFunc = (value, callback) => {
    pages.current = 1;
    pages.limit = value;
    callback && callback()
  }
  return {
    pages,
    queryPageFunc,
    queryCurrentFunc,
    queryLimitFunc
  }
}

export const useForm = (form) => {
  let base = form ? form : {};
  const AppliForm = reactive(_.cloneDeep(base));

  const formRef = ref(null)

  const resetForm = (validCheck) => {
    if(validCheck) {
      formRef.value.resetFields();
    }else{
      Object.keys(AppliForm).map(x => {
        AppliForm[x] = base[x];
      })
    }
  }

  const validateForm = () => {
    return new Promise(resolve => {
      formRef.value.validate(valid => {
        resolve(valid);
      })
    })
  }

  return {
    formRef,
    AppliForm,
    resetForm,
    validateForm
  }
}

export const useUpload = (url) => { // 上传控件
  const token = window.localStorage.getItem("token");
  const action = url;
  const defaultList = ref([])
  const showUploadBtn = ref(true);
  const hideUploadBtn = () => {
    showUploadBtn.value = false;
  }
  const visibleUploadBtn = () => {
    showUploadBtn.value = true;
  }
  return {
    token,
    action,
    defaultList,
    showUploadBtn,
    hideUploadBtn,
    visibleUploadBtn
  }
}

export const useTable = (key) => { // 表格
  const { loading, showLoading, closeLoading } = useLoading()
  const datalist = ref([]); // 所有数据
  // 多选
  const selectionlist = ref([]); // 选择的数据
  const onSelect = (selection, row) => { // 选中某一项
    selectionlist.value.push(row)
  }
  const onSelectCancel = (selection, row) => { // 取消选中某一项
    selectionlist.value = selectionlist.value.filter(x => {
      return x[key] !== row[key]
    })
  }
  const onSelectAll = (selection) => { // 选中当前页所有项
    selection.map(x => {
      let idx = selectionlist.value.findIndex(y => {
        return x[key] === y[key]
      })
      if(idx < 0) {
        selectionlist.value.push(x)
      }
    })
  }
  const onSelectAllCancel = (selection) => { // 取消选中当前页所有项
    selection.map(x => {
      let idx = selectionlist.value.findIndex(y => {
        return x[key] === y[key]
      })
      if(idx > -1) {
        selectionlist.value.splice(idx, 1)
      }
    })
  }
  const onSelectionChange = (selection) => { // 选中项发生变化时
    selection.map(x => {
      let idx = selectionlist.value.findIndex(y => {
        return x[key] === y[key]
      })
      if(idx > -1) {
        selectionlist.value.splice(idx, 1)
      }else{
        selectionlist.value.push(x)
      }
    })
  }
  const selectDefault = (arr) => { // 默认选中部分
    datalist.value.map((x, i) => {
      let idx = arr.findIndex(y => {
        return x[key] === y[key]
      })
      if(idx > -1) {
        datalist.value[i]._checked = true;
      }else{
        datalist.value[i]._checked = false;
      }
    })
  }
  const selectDisabled = (arr) => { // 默认禁用
    datalist.value.map((x, i) => {
      let idx = arr.findIndex(y => {
        return x[key] === y[key]
      })
      if(idx > -1) {
        datalist.value[i]._disabled = true;
      }else{
        datalist.value[i]._disabled = false;
      }
    })
  }
  return {
    datalist,
    loading,
    showLoading,
    closeLoading,
    selectionlist,
    onSelect,
    onSelectCancel,
    onSelectAll,
    onSelectAllCancel,
    onSelectionChange,
    selectDefault,
    selectDisabled
  }
}

export const useEcharts = () => { // echarts
  const echartRef = ref(null);
  const datalist = ref([]);
  const myChart = ref(null);
  const option = ref({});

  const clearChart = () => {
    myChart.value.clear();
  }

  const initChart = () => {
    myChart.value = echarts.init(echartRef); 
    // 绘制图表
    clearChart()
    myChart.value.setOption(option.value);
  }

  onMounted(() => {
    window.onresize = () => {
      if(myChart.value) {
        nextTick(() => {
          myChart.value.resize()
        })
      }
    }
  })
  return {
    echartRef,
    datalist,
    myChart,
    option,
    initChart,
    clearChart
  }
}

export const useVuex = () => { // vuex
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error('必须在setup()方法里使用!!')
  }
  const store = vm.proxy.$store;
  
  const useState = (key, namespaced) => {
    if(namespaced) {
      return computed(() => store.state[namespaced][key])
    }
    return computed(() => store.state[key]);
  }

  const useMutations = (key, ...data) => {
    store.commit(key, ...data)
  }

  const useActions = (mutation, ...data) => {
    store.dispatch(mutation, ...data)
  }

  return {
    useState,
    useMutations,
    useActions
  }
}

export const useProvide = () => { // provide
  const result = ref(null);
  const provideFunc = (name, data) => {
    result.value = data;
    provide(name, result.value);
  }
  const injectFunc = (name) => {
    result.value = inject(name);
  }
  return {
    result,
    provideFunc,
    injectFunc
  }
}

class BusEvent {
  constructor() {
    // 收集订阅信息,调度中心
    this.list = {};
  }

  // 订阅
  $on(name, fn) {
    this.list[name] = this.list[name] || [];
    this.list[name].push(fn);
  }

  // 发布
  $emit(name, data) {
    if (this.list[name]) {
      this.list[name].forEach(fn => {
        fn(data);
      });
    }
  }

  // 取消订阅
  $off(name) {
    if (this.list[name]) {
      delete this.list[name];
    }
  }
}
const Bus = new BusEvent()

export const useBus = () => { // bus传值
  return {
    Bus
  }
}

export const useRouter = () => {  // 获取router
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error('必须在setup()方法里使用!!')
  }
  const router = vm.proxy.$router;
  return {
    router
  }
}

export const useRoute = () => { // 获取 route
  const vm = getCurrentInstance();
  if (!vm) {
      throw new Error('必须在setup()方法里使用!!')
  }
  const route = vm.proxy.$route;
  return {
    route
  }
}

export const useUserInfo = () => { // 用户基本信息
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  return {
    userInfo
  }
}