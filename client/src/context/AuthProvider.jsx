import {
    useCallback,
    useEffect,
    useState
} from "react";


import AuthContext
    from "./AuthContext.js";


import {
    apiRequest
} from "../services/api.js";


function AuthProvider({
    children
}) {

    const [
        user,
        setUser
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);



    /* =========================================
       INITIAL SESSION CHECK
    ========================================= */

    useEffect(
        () => {

            let active = true;


            async function checkSession() {

                try {

                    const data =
                        await apiRequest(
                            "/auth/me"
                        );


                    if (active) {

                        setUser(
                            data.user
                        );

                    }

                } catch (error) {

                    if (
                        error.status !== 401
                    ) {

                        console.error(
                            "Unable to check session:",
                            error
                        );

                    }


                    if (active) {

                        setUser(null);

                    }

                } finally {

                    if (active) {

                        setLoading(false);

                    }

                }

            }


            checkSession();


            return () => {

                active = false;

            };

        },
        []
    );



    /* =========================================
       REFRESH USER MANUALLY
    ========================================= */

    const refreshUser =
        useCallback(
            async () => {

                try {

                    const data =
                        await apiRequest(
                            "/auth/me"
                        );


                    setUser(
                        data.user
                    );


                    return data.user;

                } catch (error) {

                    setUser(null);


                    throw error;

                }

            },
            []
        );



    /* =========================================
       REGISTER
    ========================================= */

    const registerAccount =
        useCallback(
            async (
                registrationData
            ) => {

                return apiRequest(
                    "/auth/register",
                    {

                        method:
                            "POST",

                        body:
                            registrationData

                    }
                );

            },
            []
        );



    /* =========================================
       LOGIN
    ========================================= */

    const loginAccount =
        useCallback(
            async (
                credentials
            ) => {

                const data =
                    await apiRequest(
                        "/auth/login",
                        {

                            method:
                                "POST",

                            body:
                                credentials

                        }
                    );


                setUser(
                    data.user
                );


                return data.user;

            },
            []
        );



    /* =========================================
       LOGOUT
    ========================================= */

    const logout =
        useCallback(
            async () => {

                try {

                    await apiRequest(
                        "/auth/logout",
                        {

                            method:
                                "POST"

                        }
                    );

                } finally {

                    setUser(null);

                }

            },
            []
        );



    return (

        <AuthContext.Provider
            value={{

                user,

                loading,

                registerAccount,

                loginAccount,

                logout,

                refreshUser

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


export default AuthProvider;