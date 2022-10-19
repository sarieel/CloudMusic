import { reqBanner, reqFound } from "@/api";

export default {
  // 通过添加 namespaced: true 的方式使其成为带命名空间的模块。
  // 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
  namespaced: true, //注册后改文件名会导致报错，复制一个新文件即可
  state() {
    return {
      banners: {},
      homepage: {},
    };
  },
  actions: {
    async getBanner(context, type) {
      let result = await reqBanner(type);
      if (result.status == 200) {
        context.commit("GETBANNER", result.data);
      } else {
        return Promise.reject(new Error("fail to getBanner"));
      }
    },
    async getHomepage(context) {
      let result = await reqFound();
      if (result.status == 200) {
        context.commit("GETHOMEPAGE", result.data);
      } else {
        return Promise.reject(new Error("fail to getHomepage"));
      }
    },
  },
  mutations: {
    GETBANNER(state, data) {
      state.banners = data.banners;
    },
    GETHOMEPAGE(state, data) {
      state.homepage = data.data;
    },
  },
  getters: {
    blocks(state) {
      return state.homepage.blocks || [];
    },
    // 推荐歌单
    recommendList(state, getters) {
      return getters.blocks[1] || {};
    },
    recommendListCreatives(state, getters) {
      return getters.recommendList.creatives || [];
    },
    // 雷达歌单
    radarList(state, getters) {
      let key = 0;
      for (let index in getters.blocks) {
        if (getters.blocks[index].blockCode == "HOMEPAGE_BLOCK_MGC_PLAYLIST") {
          key = index;
        }
      }
      return getters.blocks[key];
    },
    radarListCreatives(state, getters) {
      return getters.radarList.creatives || [];
    },
  },
};
