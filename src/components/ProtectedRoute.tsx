import { Navigate, Route, useNavigate } from "react-router-dom";
import { useAuthContext } from "../utils/context"
import { useEffect } from "react";
import storeService from "../utils/helpers/store";
import { LOCAL_STORAGE_KEYS } from "../utils/helpers/constants";

const ProtectedRoute = (props: any) => {
    const { user, isLoggedIn } = useAuthContext();
    // const navigate = useNavigate();
    

    // useEffect(() => {
    //     console.log(authCtx.isLoggedIn || storeService.get(LOCAL_STORAGE_KEYS.IS_LOGGED_IN))
    // }, []);

    // console.log(isLoggedIn, "from herere")
    
    return (
        isLoggedIn ? 
        props.Element : 
        <Navigate to="/login" />
    );
}

export default ProtectedRoute