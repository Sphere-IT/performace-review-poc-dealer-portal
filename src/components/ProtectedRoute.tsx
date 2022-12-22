import { Navigate } from "react-router-dom";
import { useAuthContext } from "../utils/context"

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