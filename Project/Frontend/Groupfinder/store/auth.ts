import { GetterTree, ActionTree, MutationTree } from "vuex"
import { RootState } from '../store'
import User from "../types/user"

const default_user = {
  id: 0,
  is_admin: false,
  first_name: '',
  last_name: '',
  mail: '',
  address: '',
  zip: '',
  city: '',
  tel: '',
  website: '',
  social_media: {}
}

export const state = () => ({
  user: default_user as User,
  loggedIn: false
});
​
export type AuthState = ReturnType<typeof state>

export const getters: GetterTree<AuthState, RootState> = {
  isAdmin(state) {
      return state.user ? (state.user.is_admin ? state.user.is_admin : false) : false
  },
};

export const mutations: MutationTree<AuthState> = {
  SET_USER(state, newUser: User) {
    state.user = newUser;
  },
  SET_LOGIN(state, loggedIn: boolean){
    state.loggedIn = loggedIn;
  }
};
​
export const actions: ActionTree<AuthState, RootState> = {
  
}
