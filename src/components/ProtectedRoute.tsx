import { Navigate, Route, useNavigate } from "react-router-dom";
import { useAuthContext } from "../utils/context"
import { useEffect } from "react";
import storeService from "../utils/helpers/store";
import { LOCAL_STORAGE_KEYS } from "../utils/helpers/constants";

const ProtectedRoute = (props: any) => {
    const authCtx = useAuthContext();
    const navigate = useNavigate();
    

    useEffect(() => {
        console.log(authCtx.isLoggedIn || storeService.get(LOCAL_STORAGE_KEYS.IS_LOGGED_IN))
    }, []);
    
    return (
        authCtx.isLoggedIn || storeService.get(LOCAL_STORAGE_KEYS.IS_LOGGED_IN) ? 
        props.Element : 
        <Navigate to="/login" />
    );
}

export default ProtectedRoute