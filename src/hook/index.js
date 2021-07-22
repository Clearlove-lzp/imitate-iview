
import { ref, reactive } from '@vue/composition-api';
import _ from 'lodash';
 
export const useModal = () => { // 模态框开关
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
    closeModal
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

export const useForm = (form) => {
  let base = form ? form : {};
  const AppliForm = reactive(_.cloneDeep(base));

  const formRef = ref(null)

  const resetForm = (bool) => {
    if(bool) {
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

// export const useTable = () => { // 表格
//   const { loading, showLoading, closeLoading } = userLoading
//   return {
//   }
// }