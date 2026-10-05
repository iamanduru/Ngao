import {
    useState
} from "react";


import {
    useForm
} from "react-hook-form";


import {
    zodResolver
} from "@hookform/resolvers/zod";


import FormField
    from "../components/ui/FormField.jsx";


import {
    reportSchema
} from "../schemas/reportSchema.js";


import {
    apiRequest
} from "../services/api.js";


import "./ReportScam.css";


const scamCategories = [

    "Phishing",

    "Fake Job Offer",

    "Impersonation",

    "Payment Scam",

    "Prize / Giveaway Scam",

    "Investment Scam",

    "Other"

];


const platforms = [

    "WhatsApp",

    "Email",

    "SMS",

    "Facebook",

    "Instagram",

    "Website",

    "Other"

];


const warningSignOptions = [

    {
        value:
            "Requested credentials",

        label:
            "Asked for a password, PIN or login details"
    },

    {
        value:
            "Requested payment",

        label:
            "Asked for money or payment"
    },

    {
        value:
            "Urgent language",

        label:
            "Used urgent or threatening language"
    },

    {
        value:
            "Suspicious link",

        label:
            "Included an unfamiliar or suspicious link"
    },

    {
        value:
            "Impersonation",

        label:
            "Claimed to represent a trusted organisation or person"
    }

];


function ReportScam() {

    const [
        submitMessage,
        setSubmitMessage
    ] = useState("");


    const [
        submitError,
        setSubmitError
    ] = useState("");


    const [
        submittedReportId,
        setSubmittedReportId
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
                reportSchema
            ),

        defaultValues: {

            title: "",

            category: "",

            platform: "",

            sender: "",

            suspiciousLink: "",

            description: "",

            warningSigns: []

        }

    });



    const description =
        watch("description") || "";



    /* =========================================
       SUBMIT REPORT
    ========================================= */

    async function onSubmit(
        data
    ) {

        setSubmitMessage("");

        setSubmitError("");

        setSubmittedReportId("");


        try {

            const result =
                await apiRequest(
                    "/reports",
                    {

                        method:
                            "POST",

                        body:
                            data

                    }
                );


            setSubmitMessage(
                result.message
            );


            setSubmittedReportId(
                result.report.id
            );


            reset();

        } catch (error) {

            setSubmitError(
                error.message ||
                "Unable to submit the report. Please try again."
            );

        }

    }



    return (

        <main>

            <div className="container">


                {/* =========================
                    PAGE INTRO
                ========================= */}

                <section
                    className="
                        report-page-intro
                        animate-fade-up
                    "
                >

                    <p className="eyebrow">
                        REPORT SUSPICIOUS ACTIVITY
                    </p>


                    <h1>
                        Tell us what you received.
                    </h1>


                    <p>

                        Provide the information you have
                        about a suspicious message, link,
                        email or online interaction.

                    </p>

                </section>



                <section className="report-layout">


                    {/* =========================
                        REPORT FORM
                    ========================= */}

                    <div className="report-form-card">

                        <form
                            onSubmit={
                                handleSubmit(
                                    onSubmit
                                )
                            }
                            noValidate
                        >


                            {/* REPORT TITLE */}

                            <FormField
                                label="Report Title"
                                name="title"
                                error={
                                    errors
                                        .title
                                        ?.message
                                }
                                helpText="Give the report a short descriptive title."
                            >

                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Example: Suspicious bank verification message"
                                    maxLength="80"
                                    aria-invalid={
                                        errors.title
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "title"
                                    )}
                                />

                            </FormField>



                            {/* CATEGORY */}

                            <FormField
                                label="Scam Category"
                                name="category"
                                error={
                                    errors
                                        .category
                                        ?.message
                                }
                            >

                                <select
                                    id="category"
                                    aria-invalid={
                                        errors.category
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "category"
                                    )}
                                >

                                    <option value="">
                                        Select a category
                                    </option>


                                    {scamCategories.map(
                                        (category) => (

                                            <option
                                                key={category}
                                                value={category}
                                            >

                                                {category}

                                            </option>

                                        )
                                    )}

                                </select>

                            </FormField>



                            {/* PLATFORM */}

                            <FormField
                                label="Where did you receive it?"
                                name="platform"
                                error={
                                    errors
                                        .platform
                                        ?.message
                                }
                            >

                                <select
                                    id="platform"
                                    aria-invalid={
                                        errors.platform
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "platform"
                                    )}
                                >

                                    <option value="">
                                        Select platform
                                    </option>


                                    {platforms.map(
                                        (platform) => (

                                            <option
                                                key={platform}
                                                value={platform}
                                            >

                                                {platform}

                                            </option>

                                        )
                                    )}

                                </select>

                            </FormField>



                            {/* SENDER */}

                            <FormField
                                label="Sender or Source"
                                name="sender"
                                error={
                                    errors
                                        .sender
                                        ?.message
                                }
                                helpText="Optional. Avoid entering unnecessary personal information."
                            >

                                <input
                                    id="sender"
                                    type="text"
                                    placeholder="Example: Unknown number or organisation name"
                                    maxLength="100"
                                    aria-invalid={
                                        errors.sender
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "sender"
                                    )}
                                />

                            </FormField>



                            {/* SUSPICIOUS LINK */}

                            <FormField
                                label="Suspicious Link"
                                name="suspiciousLink"
                                error={
                                    errors
                                        .suspiciousLink
                                        ?.message
                                }
                                helpText="Optional. Do not open a suspicious link simply to copy it."
                            >

                                <input
                                    id="suspiciousLink"
                                    type="url"
                                    placeholder="https://example.com"
                                    aria-invalid={
                                        errors
                                            .suspiciousLink
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "suspiciousLink"
                                    )}
                                />

                            </FormField>



                            {/* DESCRIPTION */}

                            <FormField
                                label="Describe What Happened"
                                name="description"
                                error={
                                    errors
                                        .description
                                        ?.message
                                }
                                helpText="Do not include passwords, PINs, OTPs or security codes."
                            >

                                <textarea
                                    id="description"
                                    placeholder="Describe what happened and why the message or interaction seemed suspicious..."
                                    maxLength="700"
                                    aria-invalid={
                                        errors.description
                                            ? "true"
                                            : "false"
                                    }
                                    {...register(
                                        "description"
                                    )}
                                />

                            </FormField>



                            <div className="character-count">

                                {description.length}
                                /700

                            </div>



                            {/* =========================
                                WARNING SIGNS
                            ========================= */}

                            <fieldset className="warning-signs">

                                <legend>
                                    What made it seem suspicious?
                                </legend>


                                <p>
                                    Select all that apply.
                                </p>


                                {warningSignOptions.map(
                                    (item) => (

                                        <label
                                            className="warning-option"
                                            key={item.value}
                                        >

                                            <input
                                                type="checkbox"
                                                value={item.value}
                                                {...register(
                                                    "warningSigns"
                                                )}
                                            />


                                            <span>
                                                {item.label}
                                            </span>

                                        </label>

                                    )
                                )}

                            </fieldset>



                            {/* =========================
                                SERVER ERROR
                            ========================= */}

                            {submitError && (

                                <div
                                    className="form-error"
                                    role="alert"
                                >

                                    {submitError}

                                </div>

                            )}



                            {/* =========================
                                SUCCESS MESSAGE
                            ========================= */}

                            {submitMessage && (

                                <div
                                    className="form-success"
                                    role="status"
                                >

                                    <strong>
                                        {submitMessage}
                                    </strong>


                                    {submittedReportId && (

                                        <span className="report-reference">

                                            Reference:
                                            {" "}
                                            {submittedReportId}

                                        </span>

                                    )}

                                </div>

                            )}



                            {/* SUBMIT */}

                            <button
                                className="submit-report-button"
                                type="submit"
                                disabled={
                                    isSubmitting
                                }
                            >

                                {
                                    isSubmitting
                                        ? "Submitting report..."
                                        : "Submit Report"
                                }

                            </button>

                        </form>

                    </div>



                    {/* =========================
                        SAFETY PANEL
                    ========================= */}

                    <aside className="report-safety-panel">

                        <p className="eyebrow">
                            BEFORE YOU SUBMIT
                        </p>


                        <h2>
                            Protect your information.
                        </h2>



                        <div className="safety-item">

                            <span>
                                01
                            </span>


                            <div>

                                <h3>
                                    Never share passwords
                                </h3>


                                <p>

                                    Ngao does not need your
                                    passwords, PINs, OTPs or
                                    security codes.

                                </p>

                            </div>

                        </div>



                        <div className="safety-item">

                            <span>
                                02
                            </span>


                            <div>

                                <h3>
                                    Do not interact further
                                </h3>


                                <p>

                                    Do not respond to
                                    suspicious messages just
                                    to collect additional
                                    information.

                                </p>

                            </div>

                        </div>



                        <div className="safety-item">

                            <span>
                                03
                            </span>


                            <div>

                                <h3>
                                    Check before clicking
                                </h3>


                                <p>

                                    Avoid opening unknown
                                    links or attachments.

                                </p>

                            </div>

                        </div>



                        <div className="safety-item">

                            <span>
                                04
                            </span>


                            <div>

                                <h3>
                                    Preserve useful evidence
                                </h3>


                                <p>

                                    Keep relevant details such
                                    as the platform, sender and
                                    message context without
                                    exposing sensitive account
                                    information.

                                </p>

                            </div>

                        </div>

                    </aside>


                </section>

            </div>

        </main>

    );

}


export default ReportScam;