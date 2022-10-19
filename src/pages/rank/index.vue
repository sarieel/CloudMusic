<template>
  <el-skeleton
    style="width: 100%; margin-top: 20px; font-size: 13px"
    :loading="loading"
    :count="4"
    animated
  >
    <template #template>
      <el-skeleton :rows="4" style="margin-bottom: 30px" />
    </template>
    <template #default>
      <!-- 详情 -->
      <div class="rank" v-for="(a, index) in abstract" :key="a.id">
        <div class="title">{{ a.name }}</div>
        <img
          :src="a.coverImgUrl"
          @click="goList(a.id)"
          @mouseenter="changeIsshow(index, true)"
          @mouseleave="changeIsshow(index, false)"
        />
        <div class="hover" :style="{ display: isShow[index] }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play-copy-copy"></use>
          </svg>
        </div>
        <el-table
          :data="a.tracks"
          stripe
          :show-header="false"
          table-layout="fixed"
          style="float: left; width: 85%"
          @row-click="playmusic"
        >
          <el-table-column type="index" />
          <el-table-column prop="first" />
          <el-table-column prop="second" align="right" />>
        </el-table>
        <a href="#" @click="goList(a.id)">查看全部 ></a>
      </div>
      <!-- 折叠 -->
      <div class="rankfold"></div>
    </template>
  </el-skeleton>
</template>

<script>
import { computed, onMounted, reactive, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Rank",
  setup() {
    const loading = ref(true);
    const store = useStore();
    const router = useRouter();
    const instance = getCurrentInstance();
    const bus = instance.appContext.config.globalProperties.$bus;
    // 获取数据
    async function getData() {
      try {
        await store.dispatch("rank/getAbstract");
        loading.value = false;
      } catch (error) {
        console.log(error.message);
      }
    }
    onMounted(() => {
      getData();
    });
    // 存储数据
    const abstract = computed(() => {
      return store.state.rank.abstract.slice(0, 4);
    });
    // 跳转到榜单内容
    function goList(id) {
      router.push(`/list/${id}`);
    }
    const isShow = reactive(["none", "none", "none", "none", "none"]);
    // 怎么根据榜单数量自动生成: 1、computed不能修改、ref不能传函数；2、数据长度一开始无法获得，onmounted不能定义值
    function changeIsshow(index, isEnter) {
      isShow[index] = isEnter ? "block" : "none";
    }
    function playmusic(row) {
      // row没有id属性
      alert("请到歌单中点击");
      // bus.emit("playmusic", row.id);
    }
    return { loading, isShow, abstract, goList, changeIsshow, playmusic };
  },
};
</script>

<style lang="less" scoped>
.rank {
  position: relative;
  width: 100%;
  margin-bottom: 40px;
  .title {
    margin: 10px 0;
  }
  img {
    float: left;
    width: 15%;
    box-sizing: border-box;
    padding-right: 30px;
  }
  .hover {
    position: absolute;
    top: 82px;
    left: 50px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: white;
    opacity: 0.7;
    .icon {
      width: 12px;
      height: 12px;
      padding: 9px;
      fill: #bb6052;
    }
  }
  a {
    position: absolute;
    left: 159px;
    top: 165px;
    color: black;
    font-size: 10px;
  }
}
.rank::after {
  content: "";
  clear: both; // 清除浮动
  display: block;
}
</style>