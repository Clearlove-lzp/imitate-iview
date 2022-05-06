import {
  ref,
  reactive,
  onMounted,
  nextTick,
  computed,
  provide,
  inject,
  getCurrentInstance,
  watch,
  onUpdated,
  onBeforeUnmount,
} from "@vue/composition-api";
import _ from "lodash";
import echarts from "echarts";

// 使用es6解构，可任意设置变量
export const useState = (value) => {
  // 模拟react hook useState
  const state = typeof value === "function" ? ref(value()) : ref(value);
  const setState = (newValue) => {
    state.value = newValue;
  };
  return [state, setState];
};

export const useEffect = (callback, array) => {
  // 模拟react hook useEffect
  let func;
  onMounted(() => {
    func = callback();
  });
  onUpdated(() => {
    if (!array) {
      // 不传array,只要更新就触发
      func = callback();
    }
  });
  onBeforeUnmount(() => {
    if (typeof func === "function") {
      // return函数得情况下 消除effect
      func();
    }
  });
  array &&
    watch(array, (newValue, oldValue) => {
      // array传值监听
      func = callback();
    });
};

export const useLoading = () => {
  // loading状态
  const loading = ref(false);
  const showLoading = () => {
    loading.value = true;
  };
  const closeLoading = () => {
    loading.value = false;
  };
  return {
    loading,
    showLoading,
    closeLoading,
  };
};

export const useModal = () => {
  // 模态框开关
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  return [visible, openModal, closeModal];
};

export const usePage = () => {
  // 分页
  const pages = reactive({
    current: 1,
    limit: 10,
    total: 0,
  });
  const queryPageFunc = (callback) => {
    pages.current = 1;
    callback && callback();
  };
  const queryCurrentFunc = (value, callback) => {
    pages.current = value;
    callback && callback();
  };
  const queryLimitFunc = (value, callback) => {
    pages.current = 1;
    pages.limit = value;
    callback && callback();
  };
  return {
    pages,
    queryPageFunc,
    queryCurrentFunc,
    queryLimitFunc,
  };
};

export const useForm = (form) => {
  let base = form ? form : {};
  const AppliForm = reactive(_.cloneDeep(base));

  const formRef = ref(null);

  const resetForm = (validCheck) => {
    if (validCheck) {
      formRef.value.resetFields();
    } else {
      Object.keys(AppliForm).map((x) => {
        AppliForm[x] = base[x];
      });
    }
  };

  const validateForm = () => {
    return new Promise((resolve) => {
      formRef.value.validate((valid) => {
        resolve(valid);
      });
    });
  };

  return [formRef, AppliForm, resetForm, validateForm];
};

export const useUpload = (url) => {
  // 上传控件
  const token = window.localStorage.getItem("token");
  const uploadAction = url;
  const [defaultList, setDefaultlist] = useState([]);
  const showUploadBtn = ref(true);
  const hideUploadBtn = () => {
    showUploadBtn.value = false;
  };
  const visibleUploadBtn = () => {
    showUploadBtn.value = true;
  };
  return {
    token,
    uploadAction,
    defaultList,
    setDefaultlist,
    showUploadBtn,
    hideUploadBtn,
    visibleUploadBtn,
  };
};

export const useTable = (key) => {
  // 表格
  const [loading, setLoading] = useState(false);
  const [datalist, setDatalist] = useState([]);
  // 多选
  const [selectionlist, setSelectionlist] = useState([]); // 选择的数据
  const onSelect = (selection, row) => {
    // 选中某一项
    selectionlist.value.push(row);
  };
  const onSelectCancel = (selection, row) => {
    // 取消选中某一项
    selectionlist.value = selectionlist.value.filter((x) => {
      return x[key] !== row[key];
    });
  };
  const onSelectAll = (selection) => {
    // 选中当前页所有项
    selection.map((x) => {
      let idx = selectionlist.value.findIndex((y) => {
        return x[key] === y[key];
      });
      if (idx < 0) {
        selectionlist.value.push(x);
      }
    });
  };
  const onSelectAllCancel = (selection) => {
    // 取消选中当前页所有项
    datalist.value.map((x) => {
      let idx = selectionlist.value.findIndex((y) => {
        return x[key] === y[key];
      });
      if (idx > -1) {
        selectionlist.value.splice(idx, 1);
      }
    });
  };
  const onSelectionChange = (selection) => {
    // 选中项发生变化时
    setSelectionlist(selection);
  };
  const selectDefault = () => {
    // 默认选中部分
    datalist.value.map((x, i) => {
      let idx = selectionlist.value.findIndex((y) => {
        return x[key] === y[key];
      });
      if (idx > -1) {
        datalist.value[i]._checked = true;
      } else {
        datalist.value[i]._checked = false;
      }
    });
  };
  const selectDisabled = () => {
    // 默认禁用
    datalist.value.map((x, i) => {
      let idx = selectionlist.value.findIndex((y) => {
        return x[key] === y[key];
      });
      if (idx > -1) {
        datalist.value[i]._disabled = true;
      } else {
        datalist.value[i]._disabled = false;
      }
    });
  };
  return {
    datalist,
    setDatalist,
    loading,
    setLoading,
    selectionlist,
    setSelectionlist,
    onSelect,
    onSelectCancel,
    onSelectAll,
    onSelectAllCancel,
    onSelectionChange,
    selectDefault,
    selectDisabled,
  };
};

export const useEcharts = () => {
  // echarts
  const echartRef = ref(null);
  const [datalist, setDatalist] = useState([]);
  const [option, setOption] = useState({});
  const myChart = ref(null);

  const clearChart = () => {
    myChart.value.clear();
  };

  const initChart = () => {
    myChart.value = echarts.init(echartRef);
    // 绘制图表
    clearChart();
    myChart.value.setOption(option.value);
  };

  const resizeChart = () => {
    myChart.value && myChart.value.resize();
  };

  onMounted(() => {
    window.addEventListener("resize", resizeChart, true);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeChart, true);
  });

  return [
    echartRef,
    datalist,
    setDatalist,
    myChart,
    option,
    setOption,
    initChart,
    clearChart,
    resizeChart,
  ];
};

export const useVuex = () => {
  // vuex
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("必须在setup()方法里使用!!");
  }
  const store = vm.proxy.$store;

  const useVuexState = (key, namespaced) => {
    if (namespaced) {
      return computed(() => store.state[namespaced][key]);
    }
    return computed(() => store.state[key]);
  };

  const useMutations = (key, ...data) => {
    store.commit(key, ...data);
  };

  const useActions = (mutation, ...data) => {
    store.dispatch(mutation, ...data);
  };

  return {
    useVuexState,
    useMutations,
    useActions,
  };
};

export const useProvide = () => {
  // provide
  const result = ref(null);
  const provideFunc = (name, data) => {
    result.value = data;
    provide(name, result.value);
  };
  const injectFunc = (name) => {
    result.value = inject(name);
  };
  return {
    result,
    provideFunc,
    injectFunc,
  };
};

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
      this.list[name].forEach((fn) => {
        fn(data);
      });
    }
  }

  // 取消订阅
  $off(name) {
    if (this.list[name]) {
      delete this.list[name];
    }
    console.log(this.list);
  }
}
const Bus = new BusEvent();

export const useBus = (name, fn) => {
  // bus传值
  onMounted(() => {
    Bus.$on(name, fn);
  });
  onBeforeUnmount(() => {
    Bus.$off(name);
  });
  return {
    Bus,
  };
};

export const useRouter = () => {
  // 获取router
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("必须在setup()方法里使用!!");
  }
  const router = vm.proxy.$router;
  return {
    router,
  };
};

export const useRoute = () => {
  // 获取 route
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("必须在setup()方法里使用!!");
  }
  const route = vm.proxy.$route;
  const routeQuery = route.query;
  const routeParams = route.params;
  const routeMeta = route.meta;
  return {
    route,
    routeQuery,
    routeParams,
    routeMeta,
  };
};

export const useUserInfo = () => {
  // 用户基本信息
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  return {
    userInfo,
  };
};
