import {
    NavLink,
    useNavigate
} from "react-router-dom";


import {
    useAuth
} from "../../hooks/useAuth.js";


import "./Navbar.css";


function Navbar() {

    const navigate =
        useNavigate();


    const {
        user,
        loading,
        logout
    } = useAuth();



    function navLinkClass({
        isActive
    }) {

        return isActive
            ? "nav-link active"
            : "nav-link";

    }



    async function handleLogout() {

        try {

            await logout();


            navigate(
                "/"
            );

        } catch (error) {

            console.error(
                "Unable to log out:",
                error
            );

        }

    }



    return (

        <header className="site-header">

            <div className="navbar-container">


                {/* BRAND */}

                <NavLink
                    to="/"
                    className="brand"
                    aria-label="Ngao home"
                >

                    Ngao

                </NavLink>



                {/* NAVIGATION */}

                <nav
                    className="main-nav"
                    aria-label="Main navigation"
                >


                    <NavLink
                        to="/"
                        end
                        className={
                            navLinkClass
                        }
                    >

                        Home

                    </NavLink>



                    <NavLink
                        to="/about"
                        className={
                            navLinkClass
                        }
                    >

                        About

                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={
                            navLinkClass
                        }
                    >

                        Contact

                    </NavLink>



                    {/* =========================
                        LOADING SESSION
                    ========================= */}

                    {loading && (

                        <span className="nav-session-loading">

                            Checking account...

                        </span>

                    )}



                    {/* =========================
                        LOGGED OUT
                    ========================= */}

                    {!loading &&
                        !user && (

                            <>

                                <NavLink
                                    to="/report"
                                    className={
                                        navLinkClass
                                    }
                                >

                                    Report Scam

                                </NavLink>


                                <NavLink
                                    to="/login"
                                    className={
                                        navLinkClass
                                    }
                                >

                                    User Portal

                                </NavLink>


                                <NavLink
                                    to="/analyst/login"
                                    className={
                                        navLinkClass
                                    }
                                >

                                    Analyst Portal

                                </NavLink>

                            </>

                        )}



                    {/* =========================
                        NORMAL USER
                    ========================= */}

                    {!loading &&
                        user?.role ===
                            "user" && (

                            <>

                                <NavLink
                                    to="/report"
                                    className={
                                        navLinkClass
                                    }
                                >

                                    Report Scam

                                </NavLink>


                                <NavLink
                                    to="/dashboard"
                                    className={
                                        navLinkClass
                                    }
                                >

                                    My Dashboard

                                </NavLink>


                                <button
                                    type="button"
                                    className="nav-logout"
                                    onClick={
                                        handleLogout
                                    }
                                >

                                    Logout

                                </button>

                            </>

                        )}



                    {/* =========================
                        ANALYST
                    ========================= */}

                    {!loading &&
                        user?.role ===
                            "analyst" && (

                            <>

                                <NavLink
                                    to="/analyst/dashboard"
                                    className={
                                        navLinkClass
                                    }
                                >

                                    Analyst Dashboard

                                </NavLink>


                                <button
                                    type="button"
                                    className="nav-logout"
                                    onClick={
                                        handleLogout
                                    }
                                >

                                    Logout

                                </button>

                            </>

                        )}

                </nav>

            </div>

        </header>

    );

}


export default Navbar;