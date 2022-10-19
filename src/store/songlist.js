import {
  reqListInfo,
  reqListUrl,
  reqRecommendList,
  reqQualityList,
} from "@/api/index";

export default {
  namespaced: true,

  state() {
    return {
      listinfo: {},
      listurl: [],
      recommendlist: [],
      qualityList: [],
    };
  },
  actions: {
    // 歌单信息
    async getListInfo({ commit }, id) {
      let result = await reqListInfo(id);
      if (result.status == 200) {
        commit("GETLISTINFO", result.data);
      }
    },
    // 歌单曲目
    async getListUrl({ commit }, id) {
      let result = await reqListUrl(id);
      if (result.status == 200) {
        commit("GETLISTURL", result.data);
      }
    },
    // 推荐歌单
    async getRecommendList({ commit }) {
      let result = await reqRecommendList();
      if (result.status == 200) {
        commit("GETRECOMMENDLIST", result.data);
      } else {
        return Promise.reject("fail to get recommendLists");
      }
    },
    // 精品歌单
    async getQualityList({ commit }) {
      let result = await reqQualityList();
      if (result.status == 200) {
        commit("GETQUALITYLIST", result.data);
      } else {
        return Promise.reject("fail to get qualityList");
      }
    },
  },
  mutations: {
    GETLISTINFO(state, data) {
      state.listinfo = data.playlist;
    },
    GETLISTURL(state, data) {
      state.listurl = data.songs;
    },
    GETRECOMMENDLIST(state, data) {
      state.recommendlist = data.result;
    },
    GETQUALITYLIST(state, data) {
      state.qualityList = data.playlists;
    },
  },
  getters: {
    creator(state) {
      return state.listinfo.creator || {};
    },
    firstQualityList(state) {
      return state.qualityList[0] || {};
    },
  },
};
