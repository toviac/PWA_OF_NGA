// 检索icon目录
// require.context(搜索目录, 是否搜索子目录, 正则匹配)
// 返回一个函数
// 函数有三个属性:
// resolve：是一个函数，它返回请求被解析后得到的模块 id。
// keys：也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成. 元素格式: './xxx.png'
// id：是上下文模块里面所包含的模块 id
const context = require.context('../../../public/img/icons', false, /.png$/);

const icons = {
  state: {
    icons: new Set(context.keys()),
  },
  mutations: {
    ADD_ICON: (state, payload) => {
      state.icons.add(payload);
    },
    REMOVE_ICON: (state, payload) => {
      state.icons.delete(payload);
    },
  },
  namespaced: true,
};

export default icons;
