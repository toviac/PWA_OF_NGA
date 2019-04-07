// 当前状态(各种)
const current = {
  state: {
    fid: '',
    tid: '',
  },
  mutations: {
    updateFid: (state, payload) => {
      state.fid = payload;
    },
    updateTid: (state, payload) => {
      state.tid = payload;
    },
  },
  namespaced: true,
};

export default current;
