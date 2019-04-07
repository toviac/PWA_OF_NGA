const getters = {
  icons: state => [...state.icons.icons],
  currentFid: state => state.current.fid,
};

export default getters;
