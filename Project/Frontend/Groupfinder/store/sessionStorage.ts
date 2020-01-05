
import { GetterTree, ActionTree, MutationTree } from "vuex"
import { RootState } from '../store'

export const state = () => ({
});
​
export type sessionStorageState = ReturnType<typeof state>

export const getters: GetterTree<sessionStorageState, RootState> = {
  
};

export const mutations: MutationTree<sessionStorageState> = {

};
​
export const actions: ActionTree<sessionStorageState, RootState> = {
  
}
