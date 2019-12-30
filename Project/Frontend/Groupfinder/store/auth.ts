/*export const state = () => ({
  user: {
    id: 1,
    first_name: 'Lennert',
    last_name: 'Geebelen',
    mail: 'lennert.geebelen@mail.com',
    address: 'ditiseenstraatnaam 100',
    zip: '3500',
    city: 'Brussel',
    tel: '+32000112233',
    website: 'www.mywebsite.be',
    social_media: {}
  }
}) */

import { GetterTree, ActionTree, MutationTree } from "vuex"
import { RootState } from '../store'
import User from "../types/user"

export const state = () => ({
  user: {} as User,
  loggedIn: false as boolean
});
​
export type AuthState = ReturnType<typeof state>

export const getters: GetterTree<AuthState, RootState> = {
  isAdmin(state) {
      return state.user.is_admin ? state.user.is_admin : false
  },
};

export const mutations: MutationTree<AuthState> = {
  SET_USER(state, newUser: User) {
      state.user = newUser;
      state.loggedIn = true;
  }
};
​
export const actions: ActionTree<AuthState, RootState> = {
  
}
