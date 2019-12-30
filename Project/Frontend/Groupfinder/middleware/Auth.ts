import axios from 'axios';
//import * as _ from "lodash";
//import _ from "lodash";
const _ = require("lodash")
import API from '~/helpers/Api'
import * as Auth from '~/helpers/Auth'

export default function ({ store, redirect, route }: {store: any, redirect: any, route: any}) : Promise<void>{
    return new Promise((resolve, reject) => {
        const excludedRoutes = ['signup'];
    // Continue to page if authentication is not required
    if (_.includes(excludedRoutes, route.name)) {
        resolve();
        return;
    }

    if (!Auth.loggedIn()) {                 // If the user is not authenticated, redirect
        return redirect('/signup')
    } else if(!store.state.auth.user.id){    // Fetch user data again if it's not available 
        //TODO: fetch data with id in session and commit to store
        return;
    } 
    else{   // User is authenticated and data is still available
        resolve()
    }   
    });
} 