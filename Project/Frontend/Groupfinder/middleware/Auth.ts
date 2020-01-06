import axios from 'axios';
const _ = require("lodash")
import API from '~/helpers/Api'
import * as Auth from '~/helpers/Auth'

export default function ({ store, redirect, route }: {store: any, redirect: any, route: any}) : Promise<void>{
    return new Promise(async (resolve, reject) => {        
        const excludedRoutes = ['signup'];
    // Continue to page if authentication is not required
    if (_.includes(excludedRoutes, route.name)) {
        if(Auth.loggedIn(store)){
            return redirect('/recommendedProjects')
        }
        resolve();
        return;
    }{

    console.log(`trying to access |${route.name}|`);
    
    if (!Auth.loggedIn(store)) {             // If the user is not authenticated, redirect
        return redirect('/signup')
    } else {                            
        if(!store.state.auth.user.id){    // User is authenticated and data is not available
            // Fetch user data again if it's not available 
            try{
                const response = await axios.post(API('auth/login'), {mail: store.state.localStorage.mail, password: store.state.localStorage.pw});
                const user = response.data.user;
                store.commit('auth/SET_USER', user);
                store.commit('auth/SET_LOGIN', true);
            }
            catch (error){  // stored credentials are invalid
                store.commit('localStorage/RESET_TOKEN');
                return redirect('/signup')
            }
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