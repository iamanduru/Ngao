import {
    useState
} from "react";


import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";


import {
    useForm
} from "react-hook-form";


import {
    zodResolver
} from "@hookform/resolvers/zod";


import FormField
    from "../components/ui/FormField.jsx";


import {
    loginSchema
} from "../schemas/authSchemas.js";


import {
    useAuth
} from "../hooks/useAuth.js";


import "./Auth.css";


function UserLogin() {

    const navigate =
        useNavigate();


    const location =
        useLocation();


    const {
        loginAccount,
        logout
    } = useAuth();



    const [
        showPassword,
        setShowPassword
    ] = useState(false);


    const [
        serverError,
        setServerError
    ] = useState("");



    const {

        register,

        handleSubmit,

        formState: {
            errors,
            isSubmitting
        }

    } = useForm({

        resolver:
            zodResolver(
                loginSchema
            ),

        defaultValues: {

            email: "",

            password: ""

        }

    });



    /*
        If ProtectedRoute sent the user here,
        remember where they originally wanted
        to go.

        Otherwise default to /dashboard.
    */

    const intendedDestination =
        location.state?.from?.pathname ||
        "/dashboard";



    async function onSubmit(
        data
    ) {

        setServerError("");


        try {

            const authenticatedUser =
                await loginAccount({

                    email:
                        data.email,

                    password:
                        data.password

                });



            /* =================================
               USER PORTAL ROLE CHECK
            ================================= */

            if (
                authenticatedUser.role
                !== "user"
            ) {

                await logout();


                setServerError(
                    "Analyst accounts must sign in through the Analyst Portal."
                );


                return;

            }



            /* =================================
               RETURN TO INTENDED PAGE
            ================================= */

            navigate(
                intendedDestination,
                {
                    replace:
                        true
                }
            );

        } catch (error) {

            setServerError(
                error.message ||
                "Unable to sign in. Please try again."
            );

        }

    }



    return (

        <main className="auth-page">

            <div className="container">

                <div className="auth-layout">


                    {/* =========================
                        LOGIN FORM
                    ========================= */}

                    <section
                        className="
                            auth-card
                            animate-fade-up
                        "
                    >

                        <p className="eyebrow">
                            USER ACCESS
                        </p>


                        <h1>
                            Welcome back
                        </h1>


                        <p className="auth-description">

                            Sign in to submit suspicious
                            digital activity reports and
                            track your previous
                            submissions.

                        </p>



                        {/* SERVER ERROR */}

                        {serverError && (

                            <div
                                className="auth-error"
                                role="alert"
                            >

                                {serverError}

                            </div>

                        )}



                        <form
                            onSubmit={
                                handleSubmit(
                                    onSubmit
                                )
                            }
                            noValidate
                        >


                            {/* EMAIL */}

                            <FormField
                                label="Email Address"
                                name="email"
                                error={
                                    errors
                                        .email
                                        ?.message
                                }
                            >

                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    aria-invalid={
                                        errors.email
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "email"
                                    )}
                                />

                            </FormField>



                            {/* PASSWORD */}

                            <FormField
                                label="Password"
                                name="password"
                                error={
                                    errors
                                        .password
                                        ?.message
                                }
                            >

                                <div className="password-wrapper">

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        aria-invalid={
                                            errors.password
                                                ? "true"
                                                : "false"
                                        }
                                        {...register(
                                            "password"
                                        )}
                                    />


                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={
                                            () =>
                                                setShowPassword(
                                                    (
                                                        current
                                                    ) =>
                                                        !current
                                                )
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {
                                            showPassword
                                                ? "Hide"
                                                : "Show"
                                        }

                                    </button>

                                </div>

                            </FormField>



                            <button
                                type="submit"
                                className="auth-submit"
                                disabled={
                                    isSubmitting
                                }
                            >

                                {
                                    isSubmitting
                                        ? "Signing in..."
                                        : "Sign In"
                                }

                            </button>

                        </form>



                        <p className="auth-switch">

                            Don't have an account?
                            {" "}

                            <Link to="/register">

                                Create one

                            </Link>

                        </p>

                    </section>



                    {/* =========================
                        SECURITY PANEL
                    ========================= */}

                    <aside className="auth-info">

                        <p className="eyebrow">
                            SAFE SIGN-IN
                        </p>


                        <h2>
                            A few things to remember.
                        </h2>



                        <div className="auth-info-item">

                            <h3>
                                Check where you are signing in
                            </h3>


                            <p>

                                Phishing pages often imitate
                                legitimate login screens.

                            </p>

                        </div>



                        <div className="auth-info-item">

                            <h3>
                                Never share your password
                            </h3>


                            <p>

                                Ngao personnel should never
                                ask you to send your password
                                through email, chat or a
                                report.

                            </p>

                        </div>



                        <div className="auth-info-item">

                            <h3>
                                Analyst access is separate
                            </h3>


                            <p>

                                Authorised analysts use the
                                dedicated Analyst Portal.

                            </p>

                        </div>

                    </aside>


                </div>

            </div>

        </main>

    );

}


export default UserLogin;