import {
    useState
} from "react";


import {
    Link
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
    contactSchema
} from "../schemas/contactSchema.js";


import {
    apiRequest
} from "../services/api.js";


import "./Contact.css";


function Contact() {

    const [
        serverError,
        setServerError
    ] = useState("");


    const [
        successMessage,
        setSuccessMessage
    ] = useState("");


    const [
        reference,
        setReference
    ] = useState("");


    const {

        register,

        handleSubmit,

        reset,

        watch,

        formState: {
            errors,
            isSubmitting
        }

    } = useForm({

        resolver:
            zodResolver(
                contactSchema
            ),

        defaultValues: {

            name: "",

            email: "",

            subject: "",

            message: ""

        }

    });


    const message =
        watch("message") || "";



    async function onSubmit(
        data
    ) {

        setServerError("");

        setSuccessMessage("");

        setReference("");


        try {

            const result =
                await apiRequest(
                    "/support",
                    {

                        method:
                            "POST",

                        body:
                            data

                    }
                );


            setSuccessMessage(
                result.message
            );


            setReference(
                result.reference
            );


            reset();

        } catch (error) {

            setServerError(
                error.message ||
                "Unable to send your message."
            );

        }

    }



    return (

        <main className="contact-page">

            <div className="container">


                <section
                    className="
                        contact-intro
                        animate-fade-up
                    "
                >

                    <p className="eyebrow">
                        CONTACT & HELP
                    </p>


                    <h1>
                        How can we help?
                    </h1>


                    <p>

                        Use this form for questions about
                        Ngao, account access or general
                        support.

                    </p>

                </section>



                <section className="contact-layout">


                    {/* FORM */}

                    <div className="contact-card">

                        {serverError && (

                            <div
                                className="auth-error"
                                role="alert"
                            >

                                {serverError}

                            </div>

                        )}


                        {successMessage && (

                            <div
                                className="form-success"
                                role="status"
                            >

                                <strong>
                                    {successMessage}
                                </strong>


                                {reference && (

                                    <span className="report-reference">

                                        Reference:
                                        {" "}
                                        {reference}

                                    </span>

                                )}

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


                            <FormField
                                label="Name"
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
                                    placeholder="Your name"
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



                            <FormField
                                label="Subject"
                                name="subject"
                                error={
                                    errors
                                        .subject
                                        ?.message
                                }
                            >

                                <select
                                    id="subject"
                                    aria-invalid={
                                        errors.subject
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "subject"
                                    )}
                                >

                                    <option value="">
                                        Select a subject
                                    </option>

                                    <option value="General Question">
                                        General Question
                                    </option>

                                    <option value="Technical Support">
                                        Technical Support
                                    </option>

                                    <option value="Account Access">
                                        Account Access
                                    </option>

                                    <option value="Safety Guidance">
                                        Safety Guidance
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </FormField>



                            <FormField
                                label="Message"
                                name="message"
                                error={
                                    errors
                                        .message
                                        ?.message
                                }
                                helpText="Do not include passwords, PINs, OTPs or other security credentials."
                            >

                                <textarea
                                    id="message"
                                    maxLength="1000"
                                    placeholder="Tell us how we can help..."
                                    aria-invalid={
                                        errors.message
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "message"
                                    )}
                                />

                            </FormField>


                            <div className="character-count">

                                {message.length}
                                /1000

                            </div>



                            <button
                                type="submit"
                                className="auth-submit"
                                disabled={
                                    isSubmitting
                                }
                            >

                                {
                                    isSubmitting
                                        ? "Sending..."
                                        : "Send Message"
                                }

                            </button>

                        </form>

                    </div>



                    {/* HELP PANEL */}

                    <aside className="contact-help-panel">

                        <p className="eyebrow">
                            NEED TO REPORT A SCAM?
                        </p>


                        <h2>
                            Use the reporting portal instead.
                        </h2>


                        <p>

                            This contact form is intended
                            for questions and support.
                            Suspicious digital activity
                            should be submitted through
                            Ngao's dedicated reporting
                            workflow.

                        </p>


                        <Link
                            to="/report"
                            className="btn btn-primary"
                        >

                            Report Suspicious Activity

                        </Link>


                        <div className="contact-safety-note">

                            <strong>
                                Remember
                            </strong>


                            <p>

                                Never send passwords,
                                PINs, OTPs or security
                                codes through a support
                                request.

                            </p>

                        </div>

                    </aside>


                </section>


            </div>

        </main>

    );

}


export default Contact;