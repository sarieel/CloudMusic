import { createStore } from "vuex";
// 引入子模块
import foundmusic from "./foundmusic"; // 发现页
import playing from "./playing"; // 底部播放器
import songlist from "./songlist"; // 歌单
import rank from "./rank";

export default createStore({
  modules: {
    foundmusic,
    playing,
    songlist,
    rank,
  },
});
