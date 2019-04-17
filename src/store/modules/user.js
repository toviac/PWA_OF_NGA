const getFavFidList = () => {
  CacheStorage.open('favFidList')
};

const user = {
  state: {
    // 收藏的板块id列表
    favFidList: [],
  }
};

export default user;
