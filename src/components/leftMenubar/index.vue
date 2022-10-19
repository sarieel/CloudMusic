<template>
  <div class="menu">
    <!-- 头像 -->
    <div class="profile-pic">
      <img class="pic" src="./img/kuroyi.jpg" alt="" />
      <span class="id">id</span>
      <img class="icon" src="./img/caret-right.png" alt="" />
    </div>
    <!-- 切换页面 -->
    <div class="switch">
      <!-- 通用 -->
      <router-link to="/find">
        <div class="tab">
          <svg class="icons svg" aria-hidden="true">
            <use xlink:href="#icon-yinle"></use></svg
          ><span>发现音乐</span>
        </div>
      </router-link>
      <div class="tab">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-we"></use>
        </svg>
        <span>播客</span>
      </div>
      <div class="tab">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-jinglingshuo"></use></svg
        ><span>私人FM</span>
      </div>
      <div class="tab">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-shipinneirong"></use></svg
        ><span>视频</span>
      </div>
      <div class="tab">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-wodeguanzhu"></use></svg
        ><span>关注</span>
      </div>
      <!-- 个人 -->
      <div class="tab" id="title">我的音乐</div>
      <div class="tab">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-like"></use></svg
        ><span>我喜欢的音乐</span>
      </div>
      <div class="tab">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use></svg
        ><span>下载管理</span>
      </div>
      <div class="tab">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-yijianting"></use></svg
        ><span>最近播放</span>
      </div>
      <div class="tab">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-yueeryinse"></use></svg
        ><span>我的播客</span>
      </div>
      <div class="tab">
        <svg class="icons svg" aria-hidden="true">
          <use xlink:href="#icon-favor"></use></svg
        ><span>我的收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  setup() {},
};
</script>

<style lang='less' scoped>
.menu {
  padding: 15px 0 0 15px; //上右下左
}
// 头像
.profile-pic {
  height: 40px;
  padding-bottom: 10px;
  .pic {
    float: left;
    width: 40px;
    border-radius: 100%;
  }
  span {
    float: left;
    padding-left: 12px;
    line-height: 40px;
    font-size: 14px;
  }
  .icon {
    float: left;
    width: 15px;
    margin: 12.5px 3px; // 上下 左右
    opacity: 0.7;
  }
}
// 切换
.switch {
  #title {
    padding: 20px 0 10px 9px;
    height: 10px;
    font-size: 10px;
    opacity: 0.5;
  }
  .tab {
    font-size: 12.5px;
    height: 35px;
    .icons {
      padding: 7.5px 0 7.5px 9px;
      float: left;
      width: 20px;
    }
    .svg {
      height: 20px;
    }
    span {
      float: left;
      line-height: 35px;
      padding-left: 10px;
    }
  }
}
</style>
