import {
    Navigate,
    useLocation
} from "react-router-dom";


import {
    useAuth
} from "../../hooks/useAuth.js";


import PageLoader
    from "../ui/PageLoader.jsx";


function ProtectedRoute({
    children,
    allowedRoles,
    redirectTo = "/login"
}) {

    const location =
        useLocation();


    const {
        user,
        loading
    } = useAuth();


    /* =========================================
       SESSION CHECK
    ========================================= */

    if (loading) {

        return (

            <PageLoader
                message="Checking your session..."
            />

        );

    }


    /* =========================================
       NOT AUTHENTICATED
    ========================================= */

    if (!user) {

        return (

            <Navigate
                to={redirectTo}
                replace
                state={{
                    from:
                        location
                }}
            />

        );

    }


    /* =========================================
       WRONG ROLE
    ========================================= */

    if (
        allowedRoles &&
        !allowedRoles.includes(
            user.role
        )
    ) {

        return (

            <Navigate
                to="/"
                replace
            />

        );

    }


    return children;

}


export default ProtectedRoute;