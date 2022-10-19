<template>
  <el-carousel :interval="4000" type="card" height="200px" v-if="bannerList[0]">
    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
      <a :href="item.url">
        <img
          text="2xl"
          justify="center"
          :src="item.imageUrl"
          style="width: 100%; height: 100%; border-radius: 8px"
      /></a>
    </el-carousel-item>
  </el-carousel>
</template>


<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "Banner",
  setup() {
    const store = useStore();
    // 获得页面数据
    async function getData() {
      try {
        await store.dispatch("foundmusic/getBanner", 0);
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
      getData();
    });
    const bannerList = computed(() => store.state.foundmusic.banners);
    return { bannerList };
  },
};
</script>

<style>
.el-container .el-carousel__button {
  width: 5px;
  height: 5px;
  border-radius: 100%;
  opacity: 0.5 !important;
}

.el-container .el-carousel__indicators .is-active button {
  background-color: rgb(201, 89, 77);
  opacity: 1 !important;
}
</style>