<template>
  <el-skeleton style="width: 100%" :loading="loading" animated :count="3">
    <template #template>
      <el-skeleton :rows="5" animated style="margin: 40px 0" />
    </template>
    <template #default>
      <!-- 推荐歌单 -->
      <div class="recommend">
        <div class="title">
          <span>推荐歌单</span>
          <svg class="icons svg" aria-hidden="true">
            <use xlink:href="#icon-right" style="color: white"></use>
          </svg>
        </div>
        <div class="blocks">
          <span
            class="block"
            v-for="(c, index) in creatives"
            :key="index"
            @click="goList(c.creativeId)"
          >
            <img
              :src="c.uiElement.image.imageUrl"
              v-if="c.uiElement.image"
              @mouseenter="changeIsshow(index, true)"
              @mouseleave="changeIsshow(index, false)"
            />
            <div class="hover" :style="{ display: isShowArr[index] }">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play-copy-copy"></use>
              </svg>
            </div>
            <div class="intro" v-if="c.uiElement.mainTitle">
              {{ c.uiElement.mainTitle.title }}
            </div>
          </span>
        </div>
      </div>
      <!-- 雷达歌单 -->
      <div class="radar">
        <div class="title">
          <span>你的雷达歌单</span>
          <svg class="icons svg" aria-hidden="true">
            <use xlink:href="#icon-right" style="color: white"></use>
          </svg>
        </div>
        <div class="blocks">
          <span class="block" v-for="(r, index) in radarcreatives" :key="index">
            <img
              :src="r.uiElement.image.imageUrl"
              v-if="r.uiElement.image"
              @mouseenter="changeRadarIsshow(index, true)"
              @mouseleave="changeRadarIsshow(index, false)"
            />
            <div class="hover" :style="{ display: radarisShowArr[index] }">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play-copy-copy"></use>
              </svg>
            </div>
            <div class="intro" v-if="r.uiElement.mainTitle">
              {{ r.uiElement.mainTitle.title }}
            </div>
          </span>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "RecommendList",
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(true);
    // 获得页面数据
    async function getData() {
      try {
        await store.dispatch("foundmusic/getHomepage");
        loading.value = false; // 渲染完毕 关闭骨架屏
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
      getData();
    });
    // 推荐歌单数据
    const creatives = computed(() => {
      return store.getters["foundmusic/recommendListCreatives"].splice(0, 5); //.splice(0, 5);
    });
    // 雷达歌单数据
    const radarcreatives = computed(() => {
      return store.getters["foundmusic/radarListCreatives"].splice(0, 5);
    });
    // 跳转到歌单页面
    function goList(id) {
      router.push(`/list/${id}`);
    }
    // hover特效
    const isShowArr = reactive(["none", "none", "none", "none", "none"]);
    const radarisShowArr = reactive(["none", "none", "none", "none", "none"]);
    function changeIsshow(index, isEnter) {
      isShowArr[index] = isEnter ? "block" : "none";
    }
    function changeRadarIsshow(index, isEnter) {
      radarisShowArr[index] = isEnter ? "block" : "none";
    }
    return {
      loading,
      creatives,
      radarcreatives,
      goList,
      changeIsshow,
      isShowArr,
      radarisShowArr,
      changeRadarIsshow,
    };
  },
};
</script>

<style lang="less" scoped>
.title {
  margin-top: 10px;
  font-weight: bold;
  padding-bottom: 8px;
  height: 25.5px;
  span {
    float: left;
  }
  .icons {
    float: left;
    width: 15px;
    height: 15px;
    padding: 3.75px 0;
  }
}

.recommend,
.radar {
  margin-bottom: 40px;

  .blocks {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;

    .block {
      position: relative;
      width: 180px;
      margin-bottom: 10px;
      img {
        width: 100%;
        border-radius: 8px;
      }
      .intro {
        font-size: 12.5px;
        width: 100%;
      }
    }
  }
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
a {
  position: absolute;
  left: 159px;
  top: 165px;
  color: black;
  font-size: 10px;
}
</style>