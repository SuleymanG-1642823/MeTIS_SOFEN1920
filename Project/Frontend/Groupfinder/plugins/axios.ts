import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import Api from 'helpers/Api'

const tokenInstance = axios.create();

export default function ({ $axios, store, redirect }: {$axios: NuxtAxiosInstance, store: any, redirect: (location: string)=> void }) {
    $axios.onRequest(async function (config: AxiosRequestConfig) {
        console.log('Making request to ' + config.url);
        let token = store.sessionStorage.token;
        if(token){
            console.log("setting token for expiry request: ", token);
            try {
                const response = await tokenInstance.get(Api('auth/expiry'), {headers: {'access-token': token}});
                const expiry = response.data
                const email = store.sessionStorage.email , pw = store.sessionStorage.pw;
                if (expiry < (5 * 60) && email && pw){
                    const tokenResponse = await tokenInstance.post(Api('auth/login'), {mail: email, password: pw});
                    const newToken = tokenResponse.headers['access-token'];
                    if(newToken){
                        token = newToken;
                        console.log("Committing new token: ", token)
                        store.commit('sessionStorage/SET_TOKEN', tokenResponse.headers['access-token']);
                    }
                }
            }
            catch(error){
            }
        }
        config.headers['access-token'] = token;
        return config
    })

    $axios.onError((error: any) => {
      const code = parseInt(error.response && error.response.status)
      if (code === 401) {
        redirect('/signup')
      }
    })

    $axios.onResponse(function (response: AxiosResponse) {
        const token = response.headers['access-token']
        store.commit('sessionStorage/SET_TOKEN', token);
    })
  }