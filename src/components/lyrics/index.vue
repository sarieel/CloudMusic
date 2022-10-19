<template>
  <el-skeleton style="width: 100%" :loading="loading" animated :count="3">
    <template #template>
      <el-skeleton-item variant="circle" />
      <el-skeleton :rows="5" animated />
    </template>
    <template #default>
      <div class="bg">
        <!-- 专辑封面 -->
        <div class="album">
          <img class="cd" src="./img/cd.jpeg" alt="" />
          <img
            class="al"
            :src="albuminfo.picUrl"
            :style="{ rotate: precent * 10 + 'deg' }"
          />
          <!-- 图标 -->
          <div class="circle">
            <svg class="icons svg" aria-hidden="true">
              <use xlink:href="#icon-aixin" style="fill: black"></use>
            </svg>
          </div>
          <div class="circle">
            <svg class="icons svg" aria-hidden="true">
              <use xlink:href="#icon-shoucang" style="fill: black"></use>
            </svg>
          </div>
          <div class="circle">
            <svg class="icons svg" aria-hidden="true">
              <use xlink:href="#icon-xiazai1" style="fill: black"></use>
            </svg>
          </div>
          <div class="circle">
            <svg class="icons svg" aria-hidden="true">
              <use xlink:href="#icon-fenxiang" style="fill: black"></use>
            </svg>
          </div>
        </div>
        <div class="lyrics">
          <!-- 歌曲名 -->
          <div class="name">
            <span id="song">{{ songinfo.name }}</span>
            <span id="quality">极高音质</span>
          </div>
          <!-- 专辑名/歌手名 -->
          <div class="info">
            <span class="alname">
              专辑:
              <a href="">{{ albuminfo.name }}</a>
            </span>
            <span class="arname" style="padding-left: 10px">
              歌手:
              <a href="" v-for="(a, index) in artistinfo" :key="index">
                {{ a.name }}
              </a>
            </span>
          </div>
          <!-- 歌词 -->
          <div class="lyric">
            <el-scrollbar ref="scrollbarRef" height="400px">
              <p
                v-for="(l, index) in lyricArr"
                :key="index"
                :class="{ isCurrent: isCurrent(l.time, index) }"
              >
                {{ l.str }}
              </p>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
import { computed, onMounted, ref, getCurrentInstance, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { formatLyric } from "@/utils/lyric";

export default {
  name: "Lyrics",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const loading = ref(true);
    // 从路由获得歌曲id
    const id = computed(() => route.params.id);
    // 获取数据
    async function getData(id) {
      try {
        await store.dispatch("playing/getSongData", id);
        await store.dispatch("playing/getSongUrl", id);
        await store.dispatch("playing/getLyric", id);
        loading.value = false;
      } catch (error) {
        console.log(error.message);
      }
    }
    onMounted(() => {
      getData(id.value);
    });
    // 保存数据
    const albuminfo = computed(() => store.getters["playing/albuminfo"]);
    const artistinfo = computed(() => store.getters["playing/artistinfo"]);
    const songinfo = computed(() => store.getters["playing/data"]);
    const lyricstr = computed(() => store.getters["playing/lrc"]);
    const transfrom = computed(() => store.getters["playing/tlyric"]);
    // 格式化歌词
    const lyricArr = computed(() => formatLyric(lyricstr.value));
    const transArr = computed(() => {
      let transArr = [];
      let arr = transfrom.value.split("\n");
      arr.shift(); // 返回被删除的值，删掉翻译者
      arr.forEach((line) => {
        // 区分有无歌词
        if (/[^\s\d\[\]:.]/.test(line)) {
          let time = "";
          let str = "";
          [time, str] = line.split("]");
          time = time.replace("[", "");
          // str = str.trim();
          transArr.push({ time, str });
        } else {
          // 去掉[]符号
          line = line.replace("[", "").replace("]", "");
          transArr.push({ time: line });
        }
      });
      return transArr;
    });
    // 注册全局事件总线
    const instance = getCurrentInstance();
    const bus = instance.appContext.config.globalProperties.$bus;
    // 播放时间
    const precent = bus.precent;
    const currenTime = bus.currenSecond;
    // 根据进度切换歌词样式
    function isCurrent(time, index) {
      if (index == lyricArr.value.length) {
        return currenTime.value >= time ? true : false;
      }
      return currenTime.value >= time &&
        currenTime.value < lyricArr.value[index + 1].time
        ? true
        : false;
    }
    const scrollbarRef = ref();
    // 当前播放行数
    const updateTimes = computed(() => {
      let times = 0;
      try {
        lyricArr.value.forEach((line) => {
          if (currenTime.value <= line.time) {
            throw Error; // foreach不能用break跳出循环
          }
          if (line.str == "") {
            times += 0.5; // 空行加0.5 因为空行的height比较小
          } else {
            times++;
          }
        });
      } catch (error) {
        return times;
      }
    });
    // 自动滚动歌词
    watch(updateTimes, (value) => {
      // 当行数小于等于3时，不滚动
      // 当行数大于3时，滚动行数为当前行数-3
      value = value >= 4 ? value - 3 : 0;
      scrollbarRef.value?.setScrollTop(value * 28.5);
    });
    return {
      loading,
      id,
      albuminfo,
      artistinfo,
      songinfo,
      lyricArr,
      lyricstr,
      transArr,
      precent,
      currenTime,
      isCurrent,
      scrollbarRef,
      updateTimes,
    };
  },
};
</script>

<style lang='less' scoped>
.bg {
  height: 100%;
  padding: 50px 0 0 220px;
  // 专辑图
  .album {
    float: left;
    margin-top: 40px;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 320px;
    .cd {
      width: 320px;
      height: 320px;
    }
    .al {
      position: absolute;
      top: 60px;
      width: 200px;
      border-radius: 100%;
    }
    // 图标
    .circle {
      margin-top: 20px;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      background-color: #efefef;
      .icons {
        width: 20px;
        height: 20px;
        padding: 10px;
        opacity: 0.6;
      }
    }
  }
  .lyrics {
    float: left;
    width: 40%;
    padding-left: 70px;
    // 歌曲名
    .name {
      font-size: 20px;
      #song {
        float: left;
      }
      #quality {
        float: left;
        font-size: 12px;
        color: #c3473a;
        border: 1px solid #c3473a;
        padding: 1px;
        margin: 3.75px;
      }
    }
    .name::after {
      content: "";
      clear: both;
      display: block;
    }
    // 专辑名、歌手名
    .info {
      padding-top: 5px;
      font-size: 12px;
      a {
        color: #5e7fac;
        cursor: pointer;
      }
      a:hover {
        color: #2757aa;
        font-weight: normal;
      }
    }
    .lyric {
      width: 100%;
      margin-top: 15px;
      p {
        font-size: 12px;
        opacity: 0.5;
        margin: 0;
        padding: 6px;
      }
    }
  }
}
.isCurrent {
  font-size: 15px;
  opacity: 1 !important;
  font-weight: 500;
}
</style>

<style>
/* 歌词 */
.lyric .el-scrollbar__view {
  padding: 0px;
}
</style>