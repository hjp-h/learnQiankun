type CommonObject = {
  [key: string]: any;
};
function registerGlobalModule(store: CommonObject, props: CommonObject = {}) {
  if (!store || !store.hasModule) {
    return;
  }
  const initialState = props?.getGlobalState?.() ?? {
    menu: [],
    user: { name: "hjp" },
  };
  if (!store.hasModule("global")) {
    const globalModule = {
      namespaced: true,
      state: initialState,
      actions: {
        setGlobalState({ commit }: any, payload: CommonObject) {
          commit("setGlobalState", payload);
          commit("emitGlobalState", payload);
        },
        // 初始化，只用于mount时同步父应用的数据
        initGlobalState({ commit }: any, payload: CommonObject) {
          commit("setGlobalState", payload);
        },
      },
      mutations: {
        setGlobalState(state: CommonObject, payload: CommonObject) {
          // eslint-disable-next-line
          state = Object.assign(state, payload);
        },
        // 通知父应用
        emitGlobalState(state: CommonObject) {
          if (props.setGlobalState) {
            props.setGlobalState(state);
          }
        },
      },
    };
    store?.registerModule?.("global", globalModule);
  } else {
    // 每次mount时，都同步一次父应用数据
    store.dispatch("global/initGlobalState", initialState);
  }
}
export default registerGlobalModule;
