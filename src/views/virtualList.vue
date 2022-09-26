<!-- 虚拟列表 -->
<template>
  <div>
    <div style="height: 500px">
      <virtualListCom :listData="listData" :itemSize="20">
        <template slot-scope="virtual">
          <div
            class="infinite-list-item-customize"
            v-for="(item, index) in virtual.data.visibleData"
            :key="index"
            :class="{ odd: index % 2 === 0 }"
            :style="{
              height: virtual.data.itemSize + 'px',
              lineHeight: virtual.data.itemSize + 'px',
            }"
          >
            <span>我是父组件内容 {{ item.id }}</span>
          </div>
        </template>
      </virtualListCom>
    </div>
  </div>
</template>

<script>
import virtualListCom from "@/components/virtualListCom.vue";

export default {
  props: {},
  data() {
    return {
      listData: [],
    };
  },
  components: {
    virtualListCom,
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
  created() {
    this.listData = [];
    for (let i = 0; i < 1000; i++) {
      this.listData.push({
        value: "a",
        id: `${i}`,
      });
    }
  },
};
</script>

<style scoped>
.infinite-list-item-customize {
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(252, 59, 59);
}

.odd {
  background-color: rgb(228, 173, 173);
}
</style>