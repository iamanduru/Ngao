import {
    useState
} from "react";


import {
    Link,
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
    registerSchema
} from "../schemas/authSchemas.js";


import {
    useAuth
} from "../hooks/useAuth.js";


import "./Auth.css";


function UserRegister() {

    const navigate =
        useNavigate();


    const {
        registerAccount
    } = useAuth();



    const [
        showPassword,
        setShowPassword
    ] = useState(false);


    const [
        message,
        setMessage
    ] = useState("");


    const [
        serverError,
        setServerError
    ] = useState("");



    const {

        register,

        handleSubmit,

        reset,

        formState: {
            errors,
            isSubmitting
        }

    } = useForm({

        resolver:
            zodResolver(
                registerSchema
            ),

        defaultValues: {

            name: "",

            email: "",

            password: "",

            confirmPassword: "",

            agreement: false

        }

    });



    async function onSubmit(
        data
    ) {

        setMessage("");

        setServerError("");


        const registrationData = {

            name:
                data.name,

            email:
                data.email,

            password:
                data.password

        };


        try {

            await registerAccount(
                registrationData
            );


            reset();


            setMessage(
                "Account created successfully. Redirecting you to sign in..."
            );


            setTimeout(
                () => {

                    navigate(
                        "/login"
                    );

                },
                1000
            );

        } catch (error) {

            setServerError(
                error.message ||
                "Unable to create your account. Please try again."
            );

        }

    }



    return (

        <main className="auth-page">

            <div className="container">

                <div className="auth-layout">


                    {/* =========================
                        REGISTRATION FORM
                    ========================= */}

                    <section
                        className="
                            auth-card
                            animate-fade-up
                        "
                    >

                        <p className="eyebrow">
                            CREATE ACCOUNT
                        </p>


                        <h1>
                            Join Ngao
                        </h1>


                        <p className="auth-description">

                            Create an account to report
                            suspicious digital activity
                            and track your submissions.

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



                        {/* SUCCESS */}

                        {message && (

                            <div
                                className="auth-success"
                                role="status"
                            >

                                {message}

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


                            {/* FULL NAME */}

                            <FormField
                                label="Full Name"
                                name="name"
                                error={
                                    errors
                                        .name
                                        ?.message
                                }
                            >

                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                    aria-invalid={
                                        errors.name
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "name"
                                    )}
                                />

                            </FormField>



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
                                        autoComplete="new-password"
                                        placeholder="Create a password"
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



                            {/* PASSWORD GUIDANCE */}

                            <div className="password-rules">

                                <p>
                                    Your password should contain:
                                </p>


                                <ul>

                                    <li>
                                        At least 10 characters
                                    </li>

                                    <li>
                                        An uppercase letter
                                    </li>

                                    <li>
                                        A lowercase letter
                                    </li>

                                    <li>
                                        At least one number
                                    </li>

                                </ul>

                            </div>



                            {/* CONFIRM PASSWORD */}

                            <FormField
                                label="Confirm Password"
                                name="confirmPassword"
                                error={
                                    errors
                                        .confirmPassword
                                        ?.message
                                }
                            >

                                <div className="password-wrapper">

                                    <input
                                        id="confirmPassword"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete="new-password"
                                        placeholder="Enter your password again"
                                        aria-invalid={
                                            errors
                                                .confirmPassword
                                                ? "true"
                                                : "false"
                                        }
                                        {...register(
                                            "confirmPassword"
                                        )}
                                    />

                                </div>

                            </FormField>



                            {/* PROTOTYPE AGREEMENT */}

                            <label className="auth-agreement">

                                <input
                                    type="checkbox"
                                    {...register(
                                        "agreement"
                                    )}
                                />


                                <span>

                                    I understand that Ngao
                                    is currently an academic
                                    prototype and does not
                                    replace official reporting
                                    channels.

                                </span>

                            </label>



                            {errors.agreement && (

                                <p
                                    className="field-error"
                                    role="alert"
                                >

                                    {
                                        errors
                                            .agreement
                                            .message
                                    }

                                </p>

                            )}



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
                                        ? "Creating account..."
                                        : "Create Account"
                                }

                            </button>

                        </form>



                        <p className="auth-switch">

                            Already have an account?
                            {" "}

                            <Link to="/login">

                                Sign in

                            </Link>

                        </p>

                    </section>



                    {/* =========================
                        SECURITY PANEL
                    ========================= */}

                    <aside className="auth-info">

                        <p className="eyebrow">
                            ACCOUNT SAFETY
                        </p>


                        <h2>
                            Protect your Ngao account.
                        </h2>



                        <div className="auth-info-item">

                            <h3>
                                Use a unique password
                            </h3>

                            <p>

                                Do not reuse the password
                                you use for email, banking
                                or social media accounts.

                            </p>

                        </div>



                        <div className="auth-info-item">

                            <h3>
                                Keep credentials private
                            </h3>

                            <p>

                                Ngao will never ask you
                                to include your account
                                password inside a scam
                                report.

                            </p>

                        </div>



                        <div className="auth-info-item">

                            <h3>
                                Analyst accounts are restricted
                            </h3>

                            <p>

                                Safety analysts cannot
                                register through this
                                public registration form.

                            </p>

                        </div>

                    </aside>


                </div>

            </div>

        </main>

    );

}


export default UserRegister;