
import { GetterTree, ActionTree, MutationTree } from "vuex"
import { RootState } from '../store'

export const state = () => ({
    token: "" as string,
    mail: "" as string,
    pw: "" as string,
    id: 0 as number
});
​
export type localStorageState = ReturnType<typeof state>

export const getters: GetterTree<localStorageState, RootState> = {
  
};

export const mutations: MutationTree<localStorageState> = {
    SET_TOKEN(state, newToken: string){
        state.token = newToken;
    },
    RESET_TOKEN(state){
        state.token = "";
    },
    SET_ID(state, newID: number){
        state.id = newID;
    },
    SET_EMAIL(state, mail: string) {
        state.mail = mail;
    },
    SET_PW(state, pw: string) {
        state.pw = pw;
  }
};
​
export const actions: ActionTree<localStorageState, RootState> = {
  
}