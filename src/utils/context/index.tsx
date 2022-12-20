import { createContext, useContext, useEffect, useState } from "react";
import { LoginAsDealerDocument } from "../../gql/generated/query.graphql";
import storeService from "../helpers/store";
import { LOCAL_STORAGE_KEYS } from "../helpers/constants";

const initialState = {
    isLoggedIn: storeService.get(LOCAL_STORAGE_KEYS.IS_LOGGED_IN) ?? false,
    login: (input: any) => {},
    logout: () => {},
    user: storeService.get(LOCAL_STORAGE_KEYS.USER),
    token: storeService.get(LOCAL_STORAGE_KEYS.TOKEN),
    checkLogin: () => {}
}

const AuthContext = createContext(initialState)

export const useAuthContext = () => useContext(AuthContext);

export const MainContext = (props: any) => {
    const [loggedIn, setLoggedIn] = useState<any>(initialState.isLoggedIn);
    const [user, setUser] = useState<any>(initialState.user);
    const [token, setToken] = useState<any>(initialState.token);

    

    const login = (input: any) => {
        setUser(input.user);
        setToken(input.token);
        setLoggedIn(true);
        storeService.save(LOCAL_STORAGE_KEYS.USER,input.user)
        storeService.save(LOCAL_STORAGE_KEYS.TOKEN, input.token)
        storeService.save(LOCAL_STORAGE_KEYS.IS_LOGGED_IN, true)
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        setLoggedIn(false);
        storeService.clear();
    }

    const checkLogin = () => {
        let s = storeService.get(LOCAL_STORAGE_KEYS.USER);
        let t = storeService.get(LOCAL_STORAGE_KEYS.TOKEN);
        let loggedIN = storeService.get(LOCAL_STORAGE_KEYS.IS_LOGGED_IN);
        setUser(s);
        setToken(t);
        setLoggedIn(loggedIN ?? false);
        return {
            user: s,
            loggedIn: loggedIN,
            token: t,
        }
    }
    useEffect(() => {
        let s = storeService.get(LOCAL_STORAGE_KEYS.USER);
        let t = storeService.get(LOCAL_STORAGE_KEYS.TOKEN);
        let loggedIN = storeService.get(LOCAL_STORAGE_KEYS.IS_LOGGED_IN);
        setUser(s);
        setToken(t);
        setLoggedIn(loggedIN ?? false);
        // console.log("helldsjkflsdjlflksj", s, loggedIN, t)
    }, [])
    return (
        <AuthContext.Provider value={{
            login,
            logout,
            isLoggedIn: loggedIn,
            user,
            token,
            checkLogin
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}