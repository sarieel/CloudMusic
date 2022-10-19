<template>
  <el-skeleton style="width: 100%" :loading="loading" animated :count="3">
    <template #template>
      <el-skeleton :rows="5" animated style="margin: 40px 0" />
    </template>
    <template #default>
      <!-- 介绍 -->
      <div class="info">
        <img class="album" :src="listinfo.coverImgUrl" />
        <div class="title">
          <span id="btn">歌单</span>
          <span id="name">{{ listinfo.name }}</span>
        </div>
        <div class="creator">
          <img :src="creator.avatarUrl" alt="" />
          <a href="" class="name">{{ creator.nickname }}</a>
          <span class="date">{{ date }}创建</span>
        </div>
        <div class="btn">
          <el-button color="#e65d4c" :icon="Headset" round style="color: white"
            >播放全部</el-button
          >
          <el-button :icon="Star" round
            >收藏({{ listinfo.subscribedCount }})</el-button
          >
          <el-button :icon="Share" round
            >分享({{ listinfo.shareCount }})</el-button
          >
          <el-button :icon="Download" round>下载全部</el-button>
        </div>
        <div class="tags" v-if="tags.length != 0">
          标签:
          <span class="tag" v-for="(t, index) in tags" :key="index">
            {{ t }}
            <span v-if="index != tags.length - 1">/ </span>
          </span>
        </div>
        <div class="detail">
          <span class="nums">歌曲数: {{ listinfo.trackCount }}</span>
          <span class="playsnum">播放数: {{ listinfo.playCount }}</span>
        </div>
        <div class="intro">
          <span class="nums">简介: {{ intro }}</span>
        </div>
      </div>
      <!-- 具体内容 -->
      <div class="songs">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="歌曲列表" name="first">
            <!-- 表格 -->
            <el-table
              :data="listurl"
              :default-sort="{ prop: 'date', order: 'descending' }"
              stripe
              style="width: 100%"
              @row-click="playmusic"
            >
              <el-table-column type="index" @click="goLyric(id)" />
              <el-table-column prop="name" sortable label="音乐标题" />
              <el-table-column prop="arnew" sortable label="歌手" width="250" />
              <el-table-column prop="al.name" sortable label="专辑" />
              <el-table-column prop="dtnew" sortable label="时长" width="100" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="评论" name="second">评论</el-tab-pane>
          <el-tab-pane label="收藏者" name="third">收藏者</el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
import { computed, onMounted, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { timeFormat, dateFormat } from "@/utils/filters";
import { Headset, Star, Share, Download } from "@element-plus/icons-vue";

export default {
  name: "SongList",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const listid = computed(() => route.params.id);
    const loading = ref(true);
    const instance = getCurrentInstance();
    const bus = instance.appContext.config.globalProperties.$bus;
    // 获取歌单信息 && 骨架屏渲染
    async function getList(id) {
      await store.dispatch("songlist/getListUrl", id);
      await store.dispatch("songlist/getListInfo", id);
      loading.value = false;
    }
    onMounted(() => {
      getList(listid.value);
    });
    // 存储歌单info
    const listinfo = computed(() => store.state.songlist.listinfo);
    const creator = computed(() => store.getters["songlist/creator"]);
    const date = computed(() => dateFormat(listinfo.value.createTime));
    const tags = computed(() => listinfo.value.tags);
    const intro = computed(() => {
      if (listinfo.value.description.length > 15) {
        return listinfo.value.description.slice(0, 15) + "...";
      } else {
        return listinfo.value.description;
      }
    });
    // tab栏
    const activeName = ref("first");
    // 存储歌单url（格式化歌手名 & 歌曲长度）
    const listurl = computed(() => {
      let url = store.state.songlist.listurl;
      for (let k in url) {
        // 格式化歌手名
        let ar = url[k].ar;
        let arnew = [];
        for (let a in ar) {
          arnew.push(ar[a].name);
        }
        arnew = arnew.join(" / ");
        url[k].arnew = arnew;
        // 格式化时长
        let dtnew = timeFormat(url[k].dt / 1000);
        url[k].dtnew = dtnew;
      }
      return url;
    });
    // 播放音乐
    function playmusic(row) {
      bus.emit("playmusic", row.id);
    }
    return {
      timeFormat,
      Headset,
      Star,
      Share,
      Download,
      listid,
      getList,
      listinfo,
      creator,
      date,
      tags,
      intro,
      activeName,
      listurl,
      loading,
      playmusic,
    };
  },
};
</script>


<style lang='less' scoped>
.info {
  position: relative;
  width: 780px;
  height: 205px;
  // 歌单封面
  .album {
    float: left;
    width: 190px;
    height: 190px;
    border-radius: 10px;
  }
  // 歌单名
  .title {
    float: left;
    width: 500px;
    height: 25px;
    padding-left: 25px;
    font-size: 18px;
    font-weight: 400;
    #btn {
      float: left;
      border: 1px solid rgb(187, 96, 82);
      border-radius: 5px;
      padding: 0 3px;
      margin: 2.25px 0;
      font-size: 13px;
      color: rgb(187, 96, 82);
    }
    #name {
      padding-left: 8px;
    }
  }
  // 歌单创建者
  .creator {
    float: left;
    padding: 10px 0 0 25px;
    height: 25px;
    font-size: 12px;
    img {
      float: left;
      width: 20px;
      height: 20px;
      padding: 2.5px 0;
      border-radius: 100%;
    }
    .name {
      float: left;
      padding-left: 5px;
      line-height: 25px;
      color: blue;
    }
    .date {
      float: left;
      padding-left: 5px;
      line-height: 25px;
    }
  }
  // 操作按钮
  .btn {
    padding: 10px 0 0 25px;
    float: left;
    height: 35px;
  }
  // 标签
  .tags {
    float: left;
    width: 400px;
    padding: 10px 0 0 25px;
    font-size: 12px;
  }
  // 播放数/歌曲数
  .detail {
    float: left;
    width: 50%;
    padding: 10px 0 0 25px;
    font-size: 12px;
    .nums {
      padding-right: 10px;
    }
  }
  // 简介
  .intro {
    float: left;
    padding: 10px 0 0 25px;
    font-size: 12px;
  }
}

.songs {
  .demo-tabs {
    font-size: 10px;
  }
}
</style>

<style>
.songs .el-tabs__item {
  height: 35px;
  line-height: 35px;
}
.songs .el-tabs__item:hover {
  color: #c3473a !important;
}
.songs .is-active {
  color: #c3473a !important;
}
.songs .el-tabs__active-bar {
  background-color: #c3473a !important;
}
.songs .el-tabs__header {
  margin: 0 !important;
}
.songs .el-table {
  font-size: 12px;
}
</style>

