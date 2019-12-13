import Vue from 'vue'
import Api from '~/helpers/Api'

declare module 'vue/types/vue' {
    interface Vue {
      $api(relative_path: string): string
    }
  }
  
  Vue.prototype.$api = (relative_path: string) => Api(relative_path)
