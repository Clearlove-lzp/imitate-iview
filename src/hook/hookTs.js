
// import { ref, reactive, onMounted, nextTick, computed,
//   provide, inject, getCurrentInstance, 
//   watch, onUpdated, onBeforeUnmount, Ref, ComponentInternalInstance } from 'vue';
//  import _ from 'lodash';
//  import * as echarts from 'echarts';
// import { RefElement } from 'element-plus/lib/el-popper/src/use-popper';
 
//  // 使用es6解构，可任意设置变量
//  export const useState = (value: any) => { // 模拟react hook useState
//    const state = typeof value === 'function' ? ref(value()) : ref(value);
//    const setState = (newValue: any) => {
//      state.value = newValue;
//    }
//    return [state, setState]
//  }
 
//  export const useEffect = (callback: Function, array: any) => { // 模拟react hook useEffect
//    let func: Function
//    onMounted(() => {
//      func = callback()
//    })
//    onUpdated(() => {
//      if(!array) {  // 不传array,只要更新就触发
//        func = callback()
//      }
//    })
//    onBeforeUnmount(() => {
//      if(typeof func === 'function') { // return函数得情况下 消除effect
//        func()
//      }
//    })
//    array && watch(array, (newValue, oldValue) => { // array传值监听
//      func = callback()
//    })
//  }
 
//  export const useLoading = () => { // loading状态
//    const loading: Ref<boolean> = ref(false);
//    const showLoading = () => {
//      loading.value = true;
//    }
//    const closeLoading = () => {
//      loading.value = false;
//    }
//    return {
//      loading,
//      showLoading,
//      closeLoading
//    }
//  }
 
//  export const useModal = () => { // 模态框开关
//    const [visible, setVisible] = useState(false);
//    const [info, setInfo] = useState(null);
//    return [
//      visible,
//      setVisible,
//      info,
//      setInfo
//    ]
//  }
 
//  export const usePage = () => { // 分页
//     interface Pages{
//       current: number,
//       limit: number,
//       total: number
//     }
//    const pages: Pages = reactive({
//      current: 1,
//      limit: 10,
//      total: 0
//    })
//    const queryPageFunc = (callback: Function) => {
//      pages.current = 1;
//      callback && callback()
//    }
//    const queryCurrentFunc = (value: number, callback: Function) => {
//      pages.current = value;
//      callback && callback()
//    }
//    const queryLimitFunc = (value: number, callback: Function) => {
//      pages.current = 1;
//      pages.limit = value;
//      callback && callback()
//    }
//    return {
//      pages,
//      queryPageFunc,
//      queryCurrentFunc,
//      queryLimitFunc
//    }
//  }
 
//  export const useForm = (form: any) => {
//    let base = form ? form : {};
//    const AppliForm = reactive(_.cloneDeep(base));
 
//    const formRef: Ref<RefElement | null> = ref(null);
 
//    const resetForm = (validCheck: boolean) => {
//      if(validCheck) {
//        (formRef.value as RefElement).resetFields();
//      }else{
//        Object.keys(AppliForm).map(x => {
//          AppliForm[x] = base[x];
//        })
//      }
//    }
 
//    const validateForm = () => {
//      return new Promise(resolve => {
//       (formRef.value as RefElement).validate((valid: boolean) => {
//          resolve(valid);
//        })
//      })
//    }
 
//    return {
//      formRef,
//      AppliForm,
//      resetForm,
//      validateForm
//    }
//  }
 
//  export const useUpload = (url: string) => { // 上传控件
//    const token: string | null = window.localStorage.getItem("token");
//    const action: string = url;
//    const defaultList: any = ref([])
//    const showUploadBtn: Ref<boolean> = ref(true);
//    const hideUploadBtn = () => {
//      showUploadBtn.value = false;
//    }
//    const visibleUploadBtn = () => {
//      showUploadBtn.value = true;
//    }
//    return {
//      token,
//      action,
//      defaultList,
//      showUploadBtn,
//      hideUploadBtn,
//      visibleUploadBtn
//    }
//  }
 
//  export const useTable = (key: string) => { // 表格
//    const [loading, setLoading] = useState(false)
//    const datalist: any = ref([])
//    // 多选
//    const selectionlist: any = ref([]); // 选择的数据
//    const onSelect = (selection: any, row: any) => { // 选中某一项
//      selectionlist.value.push(row)
//    }
//    const onSelectCancel = (selection: any, row: any) => { // 取消选中某一项
//      selectionlist.value = selectionlist.value.filter((x: any) => {
//        return x[key] !== row[key]
//      })
//    }
//    const onSelectAll = (selection: any[]) => { // 选中当前页所有项
//      selection.map(x => {
//        let idx: number = selectionlist.value.findIndex((y: any) => {
//          return x[key] === y[key]
//        })
//        if(idx < 0) {
//          selectionlist.value.push(x)
//        }
//      })
//    }
//    const onSelectAllCancel = (selection: any[]) => { // 取消选中当前页所有项
//      selection.map((x: any) => {
//        let idx: number = selectionlist.value.findIndex((y: any) => {
//          return x[key] === y[key]
//        })
//        if(idx > -1) {
//          selectionlist.value.splice(idx, 1)
//        }
//      })
//    }
//    const onSelectionChange = (selection: any[]) => { // 选中项发生变化时
//      selection.map((x: any) => {
//        let idx: number = selectionlist.value.findIndex((y: any) => {
//          return x[key] === y[key]
//        })
//        if(idx > -1) {
//          selectionlist.value.splice(idx, 1)
//        }else{
//          selectionlist.value.push(x)
//        }
//      })
//    }
//    const selectDefault = (arr: any) => { // 默认选中部分
//      datalist.value.map((x: any, i: number) => {
//        let idx: number = arr.findIndex((y: any) => {
//          return x[key] === y[key]
//        })
//        if(idx > -1) {
//          datalist.value[i]._checked = true;
//        }else{
//          datalist.value[i]._checked = false;
//        }
//      })
//    }
//    const selectDisabled = (arr: any) => { // 默认禁用
//      datalist.value.map((x: any, i: number) => {
//        let idx: number = arr.findIndex((y: any) => {
//          return x[key] === y[key]
//        })
//        if(idx > -1) {
//          datalist.value[i]._disabled = true;
//        }else{
//          datalist.value[i]._disabled = false;
//        }
//      })
//    }
//    return {
//      datalist,
//      loading,
//      setLoading,
//      selectionlist,
//      onSelect,
//      onSelectCancel,
//      onSelectAll,
//      onSelectAllCancel,
//      onSelectionChange,
//      selectDefault,
//      selectDisabled
//    }
//  }
 
//  export const useEcharts = () => { // echarts
//    const echartRef: Ref<RefElement | null> = ref(null);
//    const datalist: any = ref([]);
//    const myChart: Ref<RefElement | null> = ref(null);
//    const option: any = ref({});
 
//    const clearChart = () => {
//      (myChart.value as RefElement).clear();
//    }
 
//    const initChart = () => {
//      myChart.value = echarts.init(echartRef as RefElement); 
//      // 绘制图表
//      clearChart()
//      myChart.value.setOption(option.value);
//    }
 
//    onMounted(() => {
//      window.onresize = () => {
//        if(myChart.value) {
//          nextTick(() => {
//            myChart.value.resize()
//          })
//        }
//      }
//    })
//    return {
//      echartRef,
//      datalist,
//      myChart,
//      option,
//      initChart,
//      clearChart
//    }
//  }
 
//  export const useVuex = () => { // vuex
//    const vm: ComponentInternalInstance | null = getCurrentInstance();
//    if (!vm) {
//      throw new Error('必须在setup()方法里使用!!')
//    }
//    const store = ((vm as ComponentInternalInstance).proxy as any).$store;
   
//    const useState = (key: string | number, namespaced: string | number) => {
//      if(namespaced) {
//        return computed(() => store.state[namespaced][key])
//      }
//      return computed(() => store.state[key]);
//    }
 
//    const useMutations = (key: any, ...data: any) => {
//      store.commit(key, ...data)
//    }
 
//    const useActions = (mutation: any, ...data: any) => {
//      store.dispatch(mutation, ...data)
//    }
 
//    return {
//      useState,
//      useMutations,
//      useActions
//    }
//  }
 
//  export const useProvide = () => { // provide
//    const result: any = ref(null);
//    const provideFunc = (name: string | number, data: any) => {
//      result.value = data;
//      provide(name, result.value);
//    }
//    const injectFunc = (name: string) => {
//      result.value = inject(name);
//    }
//    return {
//      result,
//      provideFunc,
//      injectFunc
//    }
//  }
 
//  class BusEvent {
//    list: {};
//    constructor() {
//      // 收集订阅信息,调度中心
//      this.list = {};
//    }
 
//    // 订阅
//    $on(name: string | number, fn: Function) {
//      this.list[name] = this.list[name] || [];
//      this.list[name].push(fn);
//    }
 
//    // 发布
//    $emit(name: string | number, data: any) {
//      if (this.list[name]) {
//        this.list[name].forEach((fn: (arg0: any) => void) => {
//          fn(data);
//        });
//      }
//    }
 
//    // 取消订阅
//    $off(name: string | number) {
//      if (this.list[name]) {
//        delete this.list[name];
//      }
//    }
//  }
//  const Bus = new BusEvent()
 
//  export const useBus = () => { // bus传值
//    return {
//      Bus
//    }
//  }
 
//  export const useRouter = () => {  // 获取router
//   const vm: ComponentInternalInstance | null = getCurrentInstance();
//   if (!vm) {
//     throw new Error('必须在setup()方法里使用!!')
//   }
//   const router = ((vm as ComponentInternalInstance).proxy as any).$router;
//   return {
//     router
//   }
//  }
 
//  export const useRoute = () => { // 获取 route
//   const vm: ComponentInternalInstance | null = getCurrentInstance();
//   if (!vm) {
//     throw new Error('必须在setup()方法里使用!!')
//   }
//   const route = ((vm as ComponentInternalInstance).proxy as any).$route;
//   return {
//     route
//   }
//  }

//  export const useRefs = () => { // 获取 ref
//   const vm: ComponentInternalInstance | null = getCurrentInstance();
//   if (!vm) {
//     throw new Error('必须在setup()方法里使用!!')
//   }
//   const refs = ((vm as ComponentInternalInstance).proxy as any).$refs;
//   return {
//     refs
//   }
// }
 
//  export const useUserInfo = () => { // 用户基本信息
//    const stringUser = window.localStorage.getItem('userInfo')
//    const userInfo = stringUser ? {} : JSON.parse(stringUser as string);
//    return {
//      userInfo
//    }
//  }