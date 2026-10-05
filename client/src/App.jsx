import {
    Route,
    Routes
} from "react-router-dom";


import Navbar
    from "./components/layout/Navbar.jsx";


import Footer
    from "./components/layout/Footer.jsx";


import ProtectedRoute
    from "./components/auth/ProtectedRoute.jsx";


import Home
    from "./pages/Home.jsx";


import About
    from "./pages/About.jsx";


import Contact
    from "./pages/Contact.jsx";


import ReportScam
    from "./pages/ReportScam.jsx";


import UserLogin
    from "./pages/UserLogin.jsx";


import UserRegister
    from "./pages/UserRegister.jsx";


import UserDashboard
    from "./pages/UserDashboard.jsx";


import AnalystLogin
    from "./pages/AnalystLogin.jsx";


import AnalystDashboard
    from "./pages/AnalystDashboard.jsx";


import NotFound
    from "./pages/NotFound.jsx";


function App() {

    return (

        <>

            {/* =========================
                ACCESSIBILITY
            ========================= */}

            <a
                href="#main-content"
                className="skip-link"
            >

                Skip to main content

            </a>


            {/* =========================
                NAVIGATION
            ========================= */}

            <Navbar />


            {/* =========================
                APPLICATION ROUTES
            ========================= */}

            <div
                id="main-content"
                tabIndex="-1"
            >

                <Routes>


                    {/* PUBLIC */}

                    <Route
                        path="/"
                        element={
                            <Home />
                        }
                    />


                    <Route
                        path="/about"
                        element={
                            <About />
                        }
                    />


                    <Route
                        path="/contact"
                        element={
                            <Contact />
                        }
                    />


                    {/* USER AUTH */}

                    <Route
                        path="/login"
                        element={
                            <UserLogin />
                        }
                    />


                    <Route
                        path="/register"
                        element={
                            <UserRegister />
                        }
                    />


                    {/* USER PROTECTED */}

                    <Route
                        path="/report"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "user"
                                ]}
                            >

                                <ReportScam />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/dashboard"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "user"
                                ]}
                            >

                                <UserDashboard />

                            </ProtectedRoute>

                        }
                    />


                    {/* ANALYST AUTH */}

                    <Route
                        path="/analyst/login"
                        element={
                            <AnalystLogin />
                        }
                    />


                    {/* ANALYST PROTECTED */}

                    <Route
                        path="/analyst/dashboard"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "analyst"
                                ]}
                                redirectTo="/analyst/login"
                            >

                                <AnalystDashboard />

                            </ProtectedRoute>

                        }
                    />


                    {/* 404 */}

                    <Route
                        path="*"
                        element={
                            <NotFound />
                        }
                    />


                </Routes>

            </div>


            {/* =========================
                FOOTER
            ========================= */}

            <Footer />

        </>

    );

}


export default App;