import { reqSongData, reqSongUrl, reqLyric } from "@/api/index";

export default {
  namespaced: true,
  state() {
    return {
      rawdata: [],
      rawurl: [],
      rawlyric: {},
      rawtranslate: {},
    };
  },
  actions: {
    // 获得歌曲信息
    async getSongData(context, id = 1981596112) {
      let result = await reqSongData(id);
      if (result.status == 200) {
        context.commit("GETSONGDATA", result.data);
      } else {
        return Promise.reject(new Error("fail to get songData"));
      }
    },
    // 获得歌曲url
    async getSongUrl(context, id = 1981596112, level = "exhigh") {
      let result = await reqSongUrl(id, level); //level
      if (result.status == 200) {
        context.commit("GETSONGURL", result.data);
      } else {
        return Promise.reject(new Error("fail to get songUrl"));
      }
    },
    // 获得歌词
    async getLyric({ commit }, id) {
      let result = await reqLyric(id);
      if (result.status == 200) {
        commit("GETLYRIC", result.data);
      }
    },
  },
  mutations: {
    GETSONGDATA(state, data) {
      state.rawdata = data.songs || []; //songs是一个只包含一个对象的数组
    },
    GETSONGURL(state, data) {
      state.rawurl = data.data || [];
    },
    GETLYRIC(state, data) {
      state.rawlyric = data.lrc;
      state.rawtranslate = data.tlyric;
    },
  },
  getters: {
    data(state) {
      return state.rawdata[0] || {};
    },
    url(state) {
      return state.rawurl[0] || {};
    },
    albuminfo(state, getters) {
      return getters.data.al || {};
    },
    artistinfo(state, getters) {
      return getters.data.ar || {};
    },
    lrc(state) {
      return state.rawlyric.lyric;
    },
    tlyric(state) {
      return state.rawtranslate.lyric;
    },
  },
};
