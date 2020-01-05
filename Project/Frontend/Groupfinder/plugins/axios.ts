import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import Api from '../helpers/Api'

const tokenInstance = axios.create();

export default function ({ $axios, store, redirect }: {$axios: NuxtAxiosInstance, store: any, redirect: (location: string)=> void }) {
    $axios.onRequest(async function (config: AxiosRequestConfig) {
        let token = store.state.localStorage.token;
        console.log(`Request for ${config.url} with token ${token}`);
        if(token){
            try {
                const response = await tokenInstance.get(Api('auth/expiry'), {headers: {'Authorization': token}});
                const expiry = response.data.time;           // Time until expiration in milliseconds
                const min_expiry = 5 * 60 * 1000;       // 5 minutes in milliseconds
                const email = store.state.localStorage.mail , pw = store.state.localStorage.pw;
                if (expiry < min_expiry && email && pw){  // Try to get a new token if current one is valid for less than 
                    const tokenResponse = await tokenInstance.post(Api('auth/login'), {mail: email, password: pw});
                    const headerData = <string> tokenResponse.headers['authorization'];
                    if(headerData){
                        const token = headerData.split(" ")[1];
                        store.commit('localStorage/SET_TOKEN', token);
                    }
                }
            }
            catch(error){
            }
        }
        config.headers['Authorization'] = "Bearer " + token;
        return config;
    })

    $axios.onError((error: any) => {
      const code = parseInt(error.response && error.response.status)
      if (code === 401) {
        redirect('/signup')
      }
    })

    $axios.onResponse(function (response: any) {
        const headerData = response.headers["authorization"];
        if(headerData){ 
            const token = headerData.split(" ")[1];
            store.commit('localStorage/SET_TOKEN', token);
        }
    })
  }