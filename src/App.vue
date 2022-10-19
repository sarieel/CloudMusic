<template>
  <div class="common-layout">
    <el-container>
      <!-- header -->
      <el-header height="50px"><totalheader /></el-header>
      <el-container>
        <el-container>
          <!-- aside -->
          <el-aside width="200px" v-if="!isFull"><leftmenu /></el-aside>
          <!-- main -->
          <el-main>
            <el-scrollbar height="686px">
              <router-view></router-view>
            </el-scrollbar>
          </el-main>
        </el-container>
        <!-- 播放栏 -->
        <el-footer height="60px"><playing /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import totalheader from "@/components/totalHeader";
import leftmenu from "@/components/leftMenubar";
import playing from "@/components/playing";
import foundmusic from "@/pages/foundmusic";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  name: "App",
  components: { totalheader, leftmenu, playing, foundmusic },
  setup() {
    const route = useRoute();
    const isFull = computed(() => {
      return route.path.indexOf("lyric") == -1 ? false : true;
    });
    return { isFull };
  },
};
</script>

<style lang='less' scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.common-layout {
  display: flex;
  flex-direction: column-reverse;

  .el-container {
    // 头部
    .el-header {
      background-color: rgb(201, 89, 77);
    }

    .el-container {
      //侧边栏
      .el-aside {
        background-color: rgb(237, 237, 237);
      }
      // main
      .el-main {
        padding: 0;
      }
      // 播放栏
      .el-footer {
        padding: 0;
        background-color: white;
      }
    }
  }
}
</style>

<style type="text/css">
.icon {
  fill: currentColor;
}
</style>

<style>
html,
body,
#app,
.common-layout {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
}

/* 滚动内容 */
.el-scrollbar__view {
  padding: 20px 90px 0 90px;
}

/* 歌单滚动内容 */
.el-table__inner-wrapper .el-scrollbar__view {
  padding: 0;
}

/* left-menu 点击样式 */
a .tab span {
  color: black;
}
.router-link-active .tab span {
  color: rgb(202, 91, 79) !important;
}
.router-link-active .tab .icons {
  fill: rgb(202, 91, 79);
}

a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
  font-weight: bold;
}
/* header 点击样式 */
.router-link-active span {
  font-weight: bold;
}
</style>