import { reqRankAbstract } from "@/api/index";

export default {
  namespaced: true,
  state() {
    return {
      abstract: [],
    };
  },
  actions: {
    async getAbstract({ commit }) {
      let result = await reqRankAbstract();
      if (result.status == 200) {
        commit("GETABSTRACT", result.data);
      } else {
        return Promise.reject(new Error("fail to get rank"));
      }
    },
  },
  mutations: {
    GETABSTRACT(state, data) {
      state.abstract = data.list || [];
    },
  },
  getters: {},
};
