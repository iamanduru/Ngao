import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../hooks/useAuth.js";

import {
    apiRequest
} from "../services/api.js";

import StatusBadge
    from "../components/ui/StatusBadge.jsx";

import {
    formatDate
} from "../utils/formatDate.js";

import "./AnalystDashboard.css";


function AnalystDashboard() {

    const navigate =
        useNavigate();


    const {
        user,
        logout
    } = useAuth();


    const [
        reports,
        setReports
    ] = useState([]);


    const [
        filter,
        setFilter
    ] = useState("All");


    const [
        loadingReports,
        setLoadingReports
    ] = useState(true);


    const [
        pageError,
        setPageError
    ] = useState("");


    const [
        actionMessage,
        setActionMessage
    ] = useState("");


    const [
        expandedReportId,
        setExpandedReportId
    ] = useState(null);


    const [
        updatingReportId,
        setUpdatingReportId
    ] = useState(null);


    /* =========================================
       LOAD REPORTS
    ========================================= */

    useEffect(
        () => {

            let active = true;


            async function loadReports() {

                try {

                    const data =
                        await apiRequest(
                            "/reports"
                        );


                    if (
                        active
                    ) {

                        setReports(
                            data.reports || []
                        );

                    }

                } catch (error) {

                    if (
                        active
                    ) {

                        setPageError(
                            error.message ||
                            "Unable to load reports."
                        );

                    }

                } finally {

                    if (
                        active
                    ) {

                        setLoadingReports(
                            false
                        );

                    }

                }

            }


            loadReports();


            return () => {

                active = false;

            };

        },
        []
    );


    /* =========================================
       STATISTICS
    ========================================= */

    const statistics =
        useMemo(
            () => ({

                total:
                    reports.length,

                pending:
                    reports.filter(
                        (report) =>
                            report.status ===
                            "Pending"
                    ).length,

                reviewed:
                    reports.filter(
                        (report) =>
                            report.status ===
                            "Reviewed"
                    ).length,

                suspicious:
                    reports.filter(
                        (report) =>
                            report.status ===
                            "Suspicious"
                    ).length

            }),
            [reports]
        );


    /* =========================================
       FILTER REPORTS
    ========================================= */

    const visibleReports =
        useMemo(
            () => {

                if (
                    filter === "All"
                ) {

                    return reports;

                }


                return reports.filter(
                    (report) =>
                        report.status ===
                        filter
                );

            },
            [
                reports,
                filter
            ]
        );


    /* =========================================
       EXPAND REPORT
    ========================================= */

    function toggleReportDetails(
        reportId
    ) {

        setExpandedReportId(
            (currentId) =>
                currentId === reportId
                    ? null
                    : reportId
        );

    }


    /* =========================================
       UPDATE REPORT STATUS
    ========================================= */

    async function handleStatusUpdate(
        reportId,
        newStatus
    ) {

        setPageError("");

        setActionMessage("");

        setUpdatingReportId(
            reportId
        );


        try {

            const data =
                await apiRequest(
                    `/reports/${reportId}/status`,
                    {

                        method:
                            "PATCH",

                        body: {

                            status:
                                newStatus

                        }

                    }
                );


            setReports(
                (currentReports) =>
                    currentReports.map(
                        (report) =>
                            report.id ===
                            reportId
                                ? data.report
                                : report
                    )
            );


            setActionMessage(
                `${reportId} updated to ${newStatus}.`
            );

        } catch (error) {

            setPageError(
                error.message ||
                "Unable to update the report."
            );

        } finally {

            setUpdatingReportId(
                null
            );

        }

    }


    /* =========================================
       LOGOUT
    ========================================= */

    async function handleLogout() {

        try {

            await logout();

            navigate(
                "/analyst/login"
            );

        } catch (error) {

            console.error(
                "Analyst logout failed:",
                error
            );

        }

    }


    return (

        <main className="analyst-dashboard">

            <div className="container">


                {/* =========================
                    HEADER
                ========================= */}

                <section
                    className="
                        analyst-dashboard-header
                        animate-fade-up
                    "
                >

                    <div>

                        <p className="eyebrow">
                            SAFETY ANALYST
                        </p>


                        <h1>
                            Review Dashboard
                        </h1>


                        <p>

                            Welcome, {user.name}.
                            Review submitted digital
                            safety reports and update
                            their assessment status.

                        </p>

                    </div>


                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={
                            handleLogout
                        }
                    >

                        Logout

                    </button>

                </section>


                {/* =========================
                    STATISTICS
                ========================= */}

                <section
                    className="analyst-stats"
                    aria-label="Report statistics"
                >

                    <article className="analyst-stat-card">

                        <span>
                            Total Reports
                        </span>

                        <strong>
                            {statistics.total}
                        </strong>

                    </article>


                    <article className="analyst-stat-card">

                        <span>
                            Pending
                        </span>

                        <strong>
                            {statistics.pending}
                        </strong>

                    </article>


                    <article className="analyst-stat-card">

                        <span>
                            Reviewed
                        </span>

                        <strong>
                            {statistics.reviewed}
                        </strong>

                    </article>


                    <article className="analyst-stat-card">

                        <span>
                            Suspicious
                        </span>

                        <strong>
                            {statistics.suspicious}
                        </strong>

                    </article>

                </section>


                {/* =========================
                    REPORT SECTION
                ========================= */}

                <section className="analyst-report-section">

                    <div className="analyst-section-heading">

                        <div>

                            <p className="eyebrow">
                                SUBMITTED REPORTS
                            </p>


                            <h2>
                                Reports requiring review
                            </h2>

                        </div>


                        <select
                            value={
                                filter
                            }
                            onChange={
                                (event) =>
                                    setFilter(
                                        event.target.value
                                    )
                            }
                            aria-label="Filter reports by status"
                        >

                            <option value="All">
                                All Reports
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Reviewed">
                                Reviewed
                            </option>

                            <option value="Suspicious">
                                Suspicious
                            </option>

                        </select>

                    </div>


                    {/* ERROR */}

                    {pageError && (

                        <div
                            className="dashboard-error"
                            role="alert"
                        >

                            {pageError}

                        </div>

                    )}


                    {/* SUCCESS */}

                    {actionMessage && (

                        <div
                            className="dashboard-success"
                            role="status"
                            aria-live="polite"
                        >

                            {actionMessage}

                        </div>

                    )}


                    {/* LOADING */}

                    {loadingReports && (

                        <p
                            className="dashboard-loading"
                            role="status"
                        >

                            Loading reports...

                        </p>

                    )}


                    {/* EMPTY */}

                    {!loadingReports &&
                        visibleReports.length ===
                            0 && (

                            <div className="analyst-empty-state">

                                <h3>
                                    No reports found
                                </h3>


                                <p>

                                    There are no reports
                                    matching this filter.

                                </p>

                            </div>

                        )}


                    {/* =========================
                        REPORT LIST
                    ========================= */}

                    {!loadingReports &&
                        visibleReports.length >
                            0 && (

                            <div className="report-list">

                                {visibleReports.map(
                                    (report) => {

                                        const isExpanded =
                                            expandedReportId ===
                                            report.id;


                                        const isUpdating =
                                            updatingReportId ===
                                            report.id;


                                        return (

                                            <article
                                                className="report-review-card"
                                                key={
                                                    report.id
                                                }
                                            >


                                                {/* TOP */}

                                                <div className="report-card-top">

                                                    <div>

                                                        <span className="report-id">

                                                            {
                                                                report.id
                                                            }

                                                        </span>


                                                        <h3>

                                                            {
                                                                report.title
                                                            }

                                                        </h3>

                                                    </div>


                                                    <StatusBadge
                                                        status={
                                                            report.status
                                                        }
                                                    />

                                                </div>


                                                {/* META */}

                                                <div className="report-meta">

                                                    <span>
                                                        {
                                                            report.category
                                                        }
                                                    </span>


                                                    <span>
                                                        {
                                                            report.platform
                                                        }
                                                    </span>


                                                    <span>

                                                        Submitted by
                                                        {" "}
                                                        {
                                                            report
                                                                .submittedBy
                                                                ?.name ||
                                                            "Unknown reporter"
                                                        }

                                                    </span>


                                                    <span>

                                                        {
                                                            formatDate(
                                                                report.submittedAt
                                                            )
                                                        }

                                                    </span>

                                                </div>


                                                {/* DESCRIPTION */}

                                                <p className="report-description">

                                                    {
                                                        report.description
                                                    }

                                                </p>


                                                {/* =========================
                                                    ACTIONS
                                                ========================= */}

                                                <div className="report-card-actions">

                                                    <button
                                                        type="button"
                                                        className="details-button"
                                                        onClick={
                                                            () =>
                                                                toggleReportDetails(
                                                                    report.id
                                                                )
                                                        }
                                                        aria-expanded={
                                                            isExpanded
                                                        }
                                                        aria-controls={
                                                            `details-${report.id}`
                                                        }
                                                    >

                                                        {
                                                            isExpanded
                                                                ? "Hide Details"
                                                                : "View Details"
                                                        }

                                                    </button>


                                                    <div className="status-control">

                                                        <label
                                                            htmlFor={
                                                                `status-${report.id}`
                                                            }
                                                        >

                                                            Review status

                                                        </label>


                                                        <select
                                                            id={
                                                                `status-${report.id}`
                                                            }
                                                            value={
                                                                report.status
                                                            }
                                                            disabled={
                                                                isUpdating
                                                            }
                                                            onChange={
                                                                (
                                                                    event
                                                                ) =>
                                                                    handleStatusUpdate(
                                                                        report.id,
                                                                        event.target.value
                                                                    )
                                                            }
                                                        >

                                                            <option value="Pending">
                                                                Pending
                                                            </option>

                                                            <option value="Reviewed">
                                                                Reviewed
                                                            </option>

                                                            <option value="Suspicious">
                                                                Suspicious
                                                            </option>

                                                        </select>


                                                        {isUpdating && (

                                                            <span
                                                                className="updating-label"
                                                                role="status"
                                                            >

                                                                Updating...

                                                            </span>

                                                        )}

                                                    </div>

                                                </div>


                                                {/* =========================
                                                    EXPANDED DETAILS
                                                ========================= */}

                                                {isExpanded && (

                                                    <div
                                                        className="report-details-panel"
                                                        id={
                                                            `details-${report.id}`
                                                        }
                                                    >

                                                        <div className="report-detail-grid">

                                                            <div>

                                                                <span>
                                                                    Reporter
                                                                </span>

                                                                <strong>

                                                                    {
                                                                        report
                                                                            .submittedBy
                                                                            ?.name ||
                                                                        "Not available"
                                                                    }

                                                                </strong>

                                                            </div>


                                                            <div>

                                                                <span>
                                                                    Reporter Email
                                                                </span>

                                                                <strong>

                                                                    {
                                                                        report
                                                                            .submittedBy
                                                                            ?.email ||
                                                                        "Not available"
                                                                    }

                                                                </strong>

                                                            </div>


                                                            <div>

                                                                <span>
                                                                    Platform
                                                                </span>

                                                                <strong>
                                                                    {
                                                                        report.platform
                                                                    }
                                                                </strong>

                                                            </div>


                                                            <div>

                                                                <span>
                                                                    Category
                                                                </span>

                                                                <strong>
                                                                    {
                                                                        report.category
                                                                    }
                                                                </strong>

                                                            </div>


                                                            <div>

                                                                <span>
                                                                    Sender / Source
                                                                </span>

                                                                <strong>

                                                                    {
                                                                        report.sender ||
                                                                        "Not provided"
                                                                    }

                                                                </strong>

                                                            </div>


                                                            <div>

                                                                <span>
                                                                    Submitted
                                                                </span>

                                                                <strong>

                                                                    {
                                                                        formatDate(
                                                                            report.submittedAt
                                                                        )
                                                                    }

                                                                </strong>

                                                            </div>

                                                        </div>


                                                        {/* URL */}

                                                        {report.suspiciousLink && (

                                                            <div className="analyst-url-section">

                                                                <span>
                                                                    Reported suspicious URL
                                                                </span>


                                                                <code>

                                                                    {
                                                                        report.suspiciousLink
                                                                    }

                                                                </code>


                                                                <small>

                                                                    Displayed as text for safety.
                                                                    Avoid opening unknown links
                                                                    during review.

                                                                </small>

                                                            </div>

                                                        )}


                                                        {/* WARNING SIGNS */}

                                                        {report.warningSigns
                                                            ?.length >
                                                            0 && (

                                                            <div className="analyst-warning-section">

                                                                <span className="detail-section-label">

                                                                    Reported warning signs

                                                                </span>


                                                                <div className="warning-tags">

                                                                    {report.warningSigns.map(
                                                                        (
                                                                            sign
                                                                        ) => (

                                                                            <span
                                                                                key={
                                                                                    sign
                                                                                }
                                                                            >

                                                                                {
                                                                                    sign
                                                                                }

                                                                            </span>

                                                                        )
                                                                    )}

                                                                </div>

                                                            </div>

                                                        )}


                                                        {/* REVIEW INFO */}

                                                        <div className="review-history">

                                                            <span className="detail-section-label">

                                                                Review information

                                                            </span>


                                                            {report.reviewedAt ? (

                                                                <>

                                                                    <p>

                                                                        Last reviewed:
                                                                        {" "}
                                                                        {
                                                                            formatDate(
                                                                                report.reviewedAt
                                                                            )
                                                                        }

                                                                    </p>


                                                                    <p>

                                                                        Reviewed by:
                                                                        {" "}
                                                                        {
                                                                            report.reviewedBy ||
                                                                            "Analyst"
                                                                        }

                                                                    </p>

                                                                </>

                                                            ) : (

                                                                <p>

                                                                    This report has not yet
                                                                    been reviewed.

                                                                </p>

                                                            )}

                                                        </div>

                                                    </div>

                                                )}

                                            </article>

                                        );

                                    }
                                )}

                            </div>

                        )}

                </section>


                {/* =========================
                    ACCOUNT
                ========================= */}

                <section className="analyst-account-strip">

                    <div>

                        <span>
                            Signed in as
                        </span>

                        <strong>
                            {user.email}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Access Role
                        </span>

                        <strong>
                            Safety Analyst
                        </strong>

                    </div>

                </section>


            </div>

        </main>

    );

}


export default AnalystDashboard;