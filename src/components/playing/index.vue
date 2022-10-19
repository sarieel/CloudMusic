<template>
  <div class="play">
    <!-- 滚动条 -->
    <div class="demo-progress">
      <el-progress
        :percentage="precent"
        :show-text="false"
        :stroke-width="2"
        color="#f56c6c"
      />
    </div>
    <!-- 专辑图 -->
    <div
      class="mask"
      @click="goLyric"
      @mouseenter="(isBig = 'block'), (bright = 0.8)"
      @mouseleave="(isBig = 'none'), (bright = 1)"
    >
      <img
        class="pic"
        :src="albuminfo.picUrl"
        :style="{ filter: `brightness(${bright})` }"
      />
      <svg class="icons svg big" aria-hidden="true" :style="{ display: isBig }">
        <use xlink:href="#icon-fangda" style="fill: white"></use>
      </svg>
    </div>
    <!-- 歌曲名-歌手 -->
    <div class="detail">
      <span class="name">{{ songinfo.name }}</span>
      <span class="artist" v-for="(ar, index) in artistinfo" :key="index">
        <i v-if="index == 0">-</i>
        {{ ar.name }}
      </span>
    </div>
    <!-- 时长 -->
    <span class="time">{{ currenTime }} / {{ timeinfo }}</span>
    <!-- 播放器 -->
    <div class="player">
      <svg class="icons svg" aria-hidden="true">
        <use xlink:href="#icon-like"></use>
      </svg>
      <svg class="icons svg" aria-hidden="true">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <div class="btn" @click="startSong">
        <svg class="icon svg" aria-hidden="true" v-if="!isPlaying">
          <use xlink:href="#icon-playCircle"></use>
        </svg>
        <svg class="icon svg" aria-hidden="true" v-if="isPlaying">
          <use xlink:href="#icon-pauseCircle"></use>
        </svg>
      </div>
      <svg class="icons svg" aria-hidden="true">
        <use xlink:href="#icon-kuaijin"></use>
      </svg>
      <svg class="icons svg" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
    <!-- 右侧按钮 -->
    <div class="right">
      <svg class="icons svg" aria-hidden="true">
        <use xlink:href="#icon-B" style="fill: black"></use>
      </svg>
      <svg class="icons svg" aria-hidden="true">
        <use xlink:href="#icon-bofanggedan"></use>
      </svg>
      <svg class="icons svg" aria-hidden="true">
        <use xlink:href="#icon-geciweidianji"></use>
      </svg>
      <span class="sound" @click="openSound">
        <svg class="icons svg" aria-hidden="true" v-if="isOpen">
          <use xlink:href="#icon-shengyin1"></use>
        </svg>
        <svg class="icons svg" aria-hidden="true" v-if="!isOpen">
          <use xlink:href="#icon-jingyin"></use>
        </svg>
      </span>
    </div>
    <audio ref="audio" :src="url.url" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { timeFormat, getSecond } from "@/utils/filters";
import { useRouter } from "vue-router";
export default {
  name: "Playing",
  setup() {
    const store = useStore();
    const router = useRouter();
    // 注册全局事件总线
    const instance = getCurrentInstance();
    const bus = instance.appContext.config.globalProperties.$bus;
    // 歌曲id
    const id = ref();
    // 获取歌曲数据
    async function getSong(id) {
      await store.dispatch("playing/getSongData", id);
      await store.dispatch("playing/getSongUrl", id);
    }
    onMounted(() => {
      getSong(id.value);
    });
    // 保存歌曲信息
    const songinfo = computed(() => store.getters["playing/data"]);
    const artistinfo = computed(() => store.getters["playing/artistinfo"]);
    const albuminfo = computed(() => store.getters["playing/albuminfo"]);
    const url = computed(() => store.getters["playing/url"]);
    const timeinfo = computed(() => timeFormat(songinfo.value.dt / 1000)); //总时长
    const totalseconds = computed(() => getSecond(songinfo.value.dt / 1000)); //总时长（秒数
    const isPlaying = ref(false); // false->不在播放
    // 控制音乐播放|暂停
    const audio = ref(); // 因为ref本身是作为渲染函数的结果来创建的，必须等待组件挂载后才能对它进行访问。
    function startSong() {
      isPlaying.value = !isPlaying.value; // 点击时已挂载完毕
      if (isPlaying.value) {
        audio.value.play();
      } else {
        audio.value.pause();
      }
    }
    // 空格触发播放
    onMounted(() => {
      document.onkeydown = (e) => {
        if (e.code == "Space") {
          startSong();
        }
      };
    });
    // 滚动条播放
    const precent = ref(0); // 进度条百分比
    const currenSecond = ref(0); // 已播放时长（秒数
    const currenTime = computed(() => timeFormat(currenSecond.value)); // 已播放时长
    function updateTime() {
      currenSecond.value = audio.value?.currentTime;
      precent.value = (currenSecond.value / totalseconds.value) * 100; // 单位是百分比所以需要*100
    }
    // 播放结束切换按钮状态
    watch(precent, (newP) => {
      if (Math.floor(newP) == 100) {
        startSong();
      }
    });
    // 控制音量（未加进度条）
    const isOpen = ref(true);
    const volume = ref(0); // 范围为0-1
    function openSound() {
      isOpen.value = !isOpen.value;
      if (isOpen.value) {
        volume.value = 0.3;
      } else {
        volume.value = 0;
      }
      audio.value.volume = volume.value;
    }
    // 切换全屏模式
    const isBig = ref("none");
    const bright = ref(1);
    function goLyric() {
      router.push(`/lyric/${id.value}`);
    }
    // 共享数据
    bus.audio = audio;
    bus.currenSecond = currenSecond;
    bus.precent = precent;
    //
    bus.on("playmusic", async (id) => {
      await getSong(id); //由于audio挂载完毕后才能使用，所以使用await
      isPlaying.value = true;
      audio.value.play();
    });
    return {
      songinfo,
      artistinfo,
      albuminfo,
      url,
      timeinfo,
      isPlaying,
      startSong,
      precent,
      currenSecond,
      currenTime,
      updateTime,
      isOpen,
      volume,
      openSound,
      isBig,
      bright,
      goLyric,
      audio,
    };
  },
};
</script>

<style lang="less" scoped>
.play {
  position: relative;
  height: 60px;
  // 专辑图
  .mask {
    float: left;
    width: 60px;
    height: 60px;
    .pic {
      float: left;
      padding: 10px;
      width: 40px;
      height: 40px;
    }
    .big {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 20px;
      height: 20px;
    }
  }

  // 歌曲名-歌手
  .detail {
    float: left;
    margin-top: 10px;
    font-size: 14px;
    .name {
      float: left;
    }
    .artist {
      float: left;
      height: 20px;
      line-height: 20px;
      padding-left: 6px;
      font-size: 12px;
      opacity: 0.5;
    }
  }
  // 歌曲时长
  .time {
    position: absolute;
    left: 60px;
    bottom: 11px;
    padding-top: 4px;
    opacity: 0.5;
    font-size: 12px;
  }
  // 播放器
  .player {
    position: absolute;
    top: 10px;
    left: 600px;
    .icons {
      float: left;
      width: 20px;
      height: 20px;
      padding: 10px 12px;
      fill: rgb(187, 96, 82);
    }
    // 播放键
    .btn {
      float: left;
      width: 40px;
      height: 40px;
      margin: 0 15px;
      cursor: pointer;
      .icon {
        float: left;
        width: 40px;
        height: 40px;
      }
    }
  }
  // 右侧按钮
  .right {
    position: absolute;
    top: 10px;
    right: 30px;
    .icons {
      float: left;
      width: 20px;
      height: 20px;
      padding: 10px;
    }
    .sound {
      float: left;
      margin: 10px;
      .icons {
        padding: 0;
        cursor: pointer;
      }
    }
  }
}
</style>

<style scoped>
.demo-progress .el-progress--line {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>