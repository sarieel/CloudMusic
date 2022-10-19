<template>
  <div class="banner">
    <!-- 背景图 -->
    <img id="bg" :src="firstQualityList.coverImgUrl" />
    <!-- 封面图 -->
    <img id="album" :src="firstQualityList.coverImgUrl" alt="" />
    <div class="info">
      <el-button round :icon="TrophyBase">精品歌单</el-button>
      <div id="title">{{ firstQualityList.name }}</div>
      <div>{{ firstQualityList.copywriter }}</div>
    </div>
  </div>
  <div class="header">
    <el-button round>
      全部歌单<el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
    <div class="blocks">
      <span class="block" v-for="(r, index) in recommendList" :key="index">
        <img
          :src="r.picUrl"
          @mouseenter="changeIsshow(index, true)"
          @mouseleave="changeIsshow(index, false)"
          @click="goSong(r.id)"
        />
        <div class="hover" :style="{ display: isShowArr[index] }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play-copy-copy"></use>
          </svg>
        </div>
        <div class="intro">{{ r.name }}</div>
      </span>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { TrophyBase, ArrowRight } from "@element-plus/icons-vue";
export default {
  name: "FoundList",
  components: { ArrowRight },
  setup() {
    const store = useStore();
    const router = useRouter();
    // 获得数据
    async function getData() {
      await store.dispatch("songlist/getRecommendList");
      await store.dispatch("songlist/getQualityList");
    }
    onMounted(() => {
      getData();
    });
    const recommendList = computed(() => store.state.songlist.recommendlist);
    const firstQualityList = computed(
      () => store.getters["songlist/firstQualityList"]
    );
    const isShowArr = reactive([
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ]);
    // computed无法修改，如何自动生成isShowArr??
    function changeIsshow(index, isEnter) {
      isShowArr[index] = isEnter ? "block" : "none";
    }
    function goSong(id) {
      router.push(`/list/${id}`);
    }
    return {
      TrophyBase,
      recommendList,
      firstQualityList,
      isShowArr,
      changeIsshow,
      goSong,
    };
  },
};
</script>

<style lang="less" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 170px;
  overflow: hidden;
  border-radius: 8px;
  // 背景图
  #bg {
    width: 100%;
    height: 100%;
    filter: brightness(60%) blur(50px);
  }
  // 封面图
  #album {
    position: absolute;
    top: 15px;
    left: 15px;
    margin-right: 15px;
    width: 140px;
    height: 140px;
    border-radius: 8px;
  }
  // 信息
  .info {
    position: absolute;
    top: 30px;
    left: 170px;
    button {
      color: #ffc87b;
      border: 1px solid #ffc87b;
      background-color: rgba(255, 255, 255, 0);
    }
    div {
      margin-top: 5px;
      color: rgba(255, 255, 255, 0.5);
      font-size: 12px;
    }
    #title {
      margin-top: 20px;
      font-size: 16px;
      color: white;
    }
  }
}
.header {
  margin-top: 15px;
  .blocks {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    .block {
      position: relative;
      width: 180px;
      margin-bottom: 30px;
      img {
        width: 100%;
        border-radius: 8px;
      }
      .intro {
        font-size: 12.5px;
        width: 100%;
      }
      .hover {
        position: absolute;
        top: 75px;
        left: 75px;
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
    }
  }
}
</style>