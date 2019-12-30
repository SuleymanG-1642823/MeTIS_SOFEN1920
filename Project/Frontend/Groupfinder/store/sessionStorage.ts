
import { GetterTree, ActionTree, MutationTree } from "vuex"
import { RootState } from '../store'

export const state = () => ({
  email: "" as string,
  pw: "" as string,
  token: "" as string
});
​
export type sessionsStorageState = ReturnType<typeof state>

export const getters: GetterTree<sessionStorageState, RootState> = {
  
};

export const mutations: MutationTree<localStorageState> = {
  SET_EMAIL(state, email: string) {
      state.email = email;
  },
  SET_PW(state, pw: string) {
      state.pw = pw;
  },
  SET_TOKEN(state, token: string){
      if (token){
          state.token = token;
      }
  }
};
​
export const actions: ActionTree<sessionsStorageState, RootState> = {
  
}
