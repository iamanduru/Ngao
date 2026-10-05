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


function AnalystLogin() {

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


    /*
        If the analyst was redirected here
        from a protected analyst page,
        remember that destination.

        Otherwise default to the analyst
        dashboard.
    */

    const intendedDestination =
        location.state?.from?.pathname ||
        "/analyst/dashboard";


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



    /* =========================================
       ANALYST LOGIN
    ========================================= */

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



            /*
                Analyst Portal only accepts
                role="analyst".
            */

            if (
                authenticatedUser.role
                !== "analyst"
            ) {

                await logout();


                setServerError(
                    "This portal is restricted to authorised safety analysts."
                );


                return;

            }



            /*
                Return analyst to the page
                they originally requested.
            */

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
                        ANALYST LOGIN FORM
                    ========================= */}

                    <section
                        className="
                            auth-card
                            animate-fade-up
                        "
                    >

                        <p className="eyebrow">
                            ANALYST PORTAL
                        </p>


                        <h1>
                            Safety Analyst Access
                        </h1>


                        <p className="auth-description">

                            Sign in using an authorised
                            analyst account to review
                            submitted digital safety
                            reports.

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
                                label="Analyst Email"
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
                                    placeholder="analyst@example.com"
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
                                        placeholder="Enter analyst password"
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



                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="auth-submit"
                                disabled={
                                    isSubmitting
                                }
                            >

                                {
                                    isSubmitting
                                        ? "Verifying access..."
                                        : "Sign In as Analyst"
                                }

                            </button>

                        </form>



                        <p className="auth-switch">

                            Not an analyst?
                            {" "}

                            <Link to="/login">

                                Go to User Portal

                            </Link>

                        </p>

                    </section>



                    {/* =========================
                        ANALYST ACCESS INFO
                    ========================= */}

                    <aside className="auth-info">

                        <p className="eyebrow">
                            RESTRICTED ACCESS
                        </p>


                        <h2>
                            Analyst accounts are controlled.
                        </h2>



                        <div className="auth-info-item">

                            <h3>
                                No public registration
                            </h3>


                            <p>

                                Analyst accounts cannot be
                                created through the public
                                Ngao registration page.

                            </p>

                        </div>



                        <div className="auth-info-item">

                            <h3>
                                Role-based access
                            </h3>


                            <p>

                                Only accounts assigned the
                                analyst role can access
                                analyst tools and review
                                submitted reports.

                            </p>

                        </div>



                        <div className="auth-info-item">

                            <h3>
                                Review responsibly
                            </h3>


                            <p>

                                Reports may contain sensitive
                                contextual information and
                                should only be accessed for
                                legitimate review purposes.

                            </p>

                        </div>

                    </aside>


                </div>

            </div>

        </main>

    );

}


export default AnalystLogin;