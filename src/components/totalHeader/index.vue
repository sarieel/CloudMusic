<template>
  <div class="total">
    <!-- 左上角放大、关闭 -->
    <!-- 前进后退 -->
    <div class="back">
      <span @click="back">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-back" style="color: white"></use>
        </svg>
      </span>
      <span @click="go">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-right" style="color: white"></use>
        </svg>
      </span>
    </div>
    <!-- 根据路由判断出现的组件 -->
    <div class="route">
      <router-link to="/find">
        <span>个性推荐</span>
      </router-link>
      <router-link to="/find/list">
        <span>歌单</span>
      </router-link>
      <router-link to="/rank">
        <span>排行榜</span>
      </router-link>
      <span>歌手</span>
      <span>最新音乐</span>
    </div>
    <!-- 搜索框 -->
    <span class="search">
      <svg class="icons svg" aria-hidden="true">
        <use xlink:href="#icon-search" style="color: white"></use>
      </svg>
      <input type="text" v-model="input" />
      <svg class="icons svg" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
      </svg>
    </span>
    <!-- 右上角图标 -->
    <span id="icons">
      <svg class="icon svg" aria-hidden="true">
        <use xlink:href="#icon-settings" style="color: white"></use>
      </svg>
      <svg class="icon svg" aria-hidden="true">
        <use xlink:href="#icon-youjian" style="color: white"></use>
      </svg>
      <svg class="icon svg" aria-hidden="true">
        <use xlink:href="#icon-clothes" style="color: white"></use>
      </svg>
    </span>

    <!-- icons -->
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  setup() {
    const router = useRouter();
    const input = ref("");
    function back() {
      router.back();
    }
    // 怎么知道没有下一个页面？
    function go() {
      router.forward();
    }
    return { input, back, go };
  },
};
</script>

<style lang='less' scoped>
.icons,
.icon {
  opacity: 0.7;
}
.total {
  position: relative;
  .back {
    position: absolute;
    top: 12.5px;
    left: 115px;
    height: 25px;
    span {
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 100%;
      margin-left: 10px;
    }
    span:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    .icons {
      padding: 5px;
      width: 15px;
      height: 15px;
      fill: white;
    }
  }

  .route {
    position: absolute;
    top: 12.5px;
    left: 200px;
    height: 25px;
    font-size: 14px;
    color: white;
    span {
      padding-left: 25px;
      line-height: 25px;
    }
  }
  .search {
    position: absolute;
    top: 12.5px;
    right: 100px;
    height: 25px;
    background-color: rgb(209, 114, 104);
    border-radius: 12px;
    .icons {
      float: left;
      width: 15px;
      height: 15px;
      fill: white;
      padding: 5px 7px;
    }
    input {
      float: left;
      width: 100px;
      height: 25px;
      outline: none;
      background-color: rgb(209, 114, 104);
      color: white;
      border: 0;
      box-sizing: border-box;
      padding: 0 2px;
    }
  }
  #icons {
    position: absolute;
    top: 12.5px;
    right: 0;
    .icon {
      float: left;
      width: 15px;
      height: 15px;
      fill: white;
      padding: 5px 7px;
    }
  }
}
</style>

