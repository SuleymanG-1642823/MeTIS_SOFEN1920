import axios from 'axios';
const _ = require("lodash")
import API from '~/helpers/Api'
import * as Auth from '~/helpers/Auth'

export default function ({ store, redirect, route }: {store: any, redirect: any, route: any}) : Promise<void>{
    return new Promise((resolve, reject) => {        
        const excludedRoutes = ['signup'];
    // Continue to page if authentication is not required
    if (_.includes(excludedRoutes, route.name)) {
        if(Auth.loggedIn(store)){
            return redirect('/')
        }
        resolve();
        return;
    }

    if (!Auth.loggedIn(store)) {             // If the user is not authenticated, redirect
        return redirect('/signup')
    } else {                            
        if(!store.state.auth.user.id){    // User is authenticated and data is still available
            // Fetch user data again if it's not available 
            axios.post(API('auth/login'), {mail: store.state.localStorage.mail, password: store.state.localStorage.pw})
            .then(function (response: any) {
                const user = response.data.user;
                store.commit('auth/SET_USER', user);
            });
            console.log(`user not found in nuxt middleware, retrieved |${store.state.auth.user}| from backend`)
        }
        if(route.name == ""){
            return redirect("/recommendedProjects")
        }
        else{
            resolve();
            return;
        }
    }});
} 