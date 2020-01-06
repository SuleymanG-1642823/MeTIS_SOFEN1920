import * as stored from "../store/index"
export function loggedIn(store: any) : boolean {
    let loggedIn = false;
    if(store.state.localStorage.token){
        loggedIn = true;
    }
    return loggedIn;
}

