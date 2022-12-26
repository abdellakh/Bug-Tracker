import Vuex from "vuex";

const cookieparser = process.server ? require("cookieparser") : undefined;

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null,
      menu: false,
      search: {
        what: "",
        where: {},
        when: {}
      }
    },
    mutations: {
      setAuth(state, auth) {
        state.auth = auth;
      },
      setSearch(state, searchData) {
        state.search = searchData;
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        let auth = null;
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie);
          try {
            auth = JSON.parse(parsed.auth);
          } catch (err) {
            // No valid cookie found
          }
        }
        commit("setAuth", auth);
      }
    }
  });
};

export default createStore;
