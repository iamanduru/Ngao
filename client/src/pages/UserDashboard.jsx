import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Link,
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

import "./UserDashboard.css";


function UserDashboard() {

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
        refreshing,
        setRefreshing
    ] = useState(false);


    const [
        pageError,
        setPageError
    ] = useState("");


    /* =========================================
       INITIAL LOAD
    ========================================= */

    useEffect(
        () => {

            let active = true;


            async function fetchReports() {

                try {

                    const data =
                        await apiRequest(
                            "/reports/mine"
                        );


                    if (active) {

                        setReports(
                            data.reports || []
                        );

                    }

                } catch (error) {

                    if (active) {

                        setPageError(
                            error.message ||
                            "Unable to load your reports."
                        );

                    }

                } finally {

                    if (active) {

                        setLoadingReports(
                            false
                        );

                    }

                }

            }


            fetchReports();


            return () => {

                active = false;

            };

        },
        []
    );


    /* =========================================
       MANUAL REFRESH
    ========================================= */

    async function refreshReports() {

        setRefreshing(true);

        setPageError("");


        try {

            const data =
                await apiRequest(
                    "/reports/mine"
                );


            setReports(
                data.reports || []
            );

        } catch (error) {

            setPageError(
                error.message ||
                "Unable to refresh your reports."
            );

        } finally {

            setRefreshing(false);

        }

    }


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
       STATUS MESSAGE
    ========================================= */

    function getStatusMessage(
        status
    ) {

        switch (
            status
        ) {

            case "Pending":

                return "Awaiting review by a safety analyst.";


            case "Reviewed":

                return "Review completed by a safety analyst.";


            case "Suspicious":

                return "Suspicious activity was identified within this Ngao prototype.";


            default:

                return "Status information is unavailable.";

        }

    }


    /* =========================================
       LOGOUT
    ========================================= */

    async function handleLogout() {

        try {

            await logout();

            navigate(
                "/login"
            );

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );

        }

    }


    return (

        <main className="user-dashboard">

            <div className="container">


                {/* =========================
                    HEADER
                ========================= */}

                <section
                    className="
                        user-dashboard-header
                        animate-fade-up
                    "
                >

                    <div>

                        <p className="eyebrow">
                            MY NGAO
                        </p>


                        <h1>
                            Welcome, {user.name}
                        </h1>


                        <p>

                            Track the reports you have
                            submitted and review their
                            current assessment status.

                        </p>

                    </div>


                    <div className="dashboard-header-actions">

                        <Link
                            to="/report"
                            className="btn btn-primary"
                        >

                            Report a Scam

                        </Link>


                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={
                                handleLogout
                            }
                        >

                            Logout

                        </button>

                    </div>

                </section>


                {/* =========================
                    STATISTICS
                ========================= */}

                <section
                    className="user-stats"
                    aria-label="Your report statistics"
                >

                    <article className="user-stat-card">

                        <span>
                            Total Reports
                        </span>

                        <strong>
                            {statistics.total}
                        </strong>

                    </article>


                    <article className="user-stat-card">

                        <span>
                            Pending
                        </span>

                        <strong>
                            {statistics.pending}
                        </strong>

                    </article>


                    <article className="user-stat-card">

                        <span>
                            Reviewed
                        </span>

                        <strong>
                            {statistics.reviewed}
                        </strong>

                    </article>


                    <article className="user-stat-card">

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

                <section className="user-report-section">

                    <div className="user-section-heading">

                        <div>

                            <p className="eyebrow">
                                REPORT HISTORY
                            </p>


                            <h2>
                                Your submitted reports
                            </h2>

                        </div>


                        <div className="user-report-controls">

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


                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={
                                    refreshReports
                                }
                                disabled={
                                    refreshing
                                }
                            >

                                {
                                    refreshing
                                        ? "Refreshing..."
                                        : "Refresh Status"
                                }

                            </button>

                        </div>

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


                    {/* LOADING */}

                    {loadingReports && (

                        <p
                            className="dashboard-loading"
                            role="status"
                        >

                            Loading your reports...

                        </p>

                    )}


                    {/* EMPTY STATE */}

                    {!loadingReports &&
                        visibleReports.length ===
                            0 && (

                            <div className="user-empty-state">

                                <h3>

                                    {
                                        reports.length === 0
                                            ? "You have not submitted a report yet."
                                            : "No reports match this filter."
                                    }

                                </h3>


                                <p>

                                    {
                                        reports.length === 0
                                            ? "If you receive a suspicious message, email, link or online offer, you can document it through Ngao."
                                            : "Choose another status to view your other reports."
                                    }

                                </p>


                                {reports.length === 0 && (

                                    <Link
                                        to="/report"
                                        className="btn btn-primary"
                                    >

                                        Submit Your First Report

                                    </Link>

                                )}

                            </div>

                        )}


                    {/* =========================
                        REPORT LIST
                    ========================= */}

                    {!loadingReports &&
                        visibleReports.length >
                            0 && (

                            <div className="user-report-list">

                                {visibleReports.map(
                                    (report) => (

                                        <article
                                            className="user-report-card"
                                            key={
                                                report.id
                                            }
                                        >


                                            {/* TOP */}

                                            <div className="user-report-card-top">

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

                                            <div className="user-report-meta">

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

                                                    {
                                                        formatDate(
                                                            report.submittedAt
                                                        )
                                                    }

                                                </span>

                                            </div>


                                            {/* DESCRIPTION */}

                                            <p className="user-report-description">

                                                {
                                                    report.description
                                                }

                                            </p>


                                            {/* EVIDENCE */}

                                            {(report.sender ||
                                                report.suspiciousLink) && (

                                                <div className="user-report-evidence">


                                                    {report.sender && (

                                                        <div>

                                                            <span>
                                                                Sender / Source
                                                            </span>


                                                            <strong>
                                                                {
                                                                    report.sender
                                                                }
                                                            </strong>

                                                        </div>

                                                    )}


                                                    {report.suspiciousLink && (

                                                        <div>

                                                            <span>
                                                                Reported URL
                                                            </span>


                                                            <code>

                                                                {
                                                                    report.suspiciousLink
                                                                }

                                                            </code>

                                                        </div>

                                                    )}

                                                </div>

                                            )}


                                            {/* WARNING SIGNS */}

                                            {report.warningSigns
                                                ?.length >
                                                0 && (

                                                <div className="user-warning-section">

                                                    <span className="detail-section-label">

                                                        Warning signs

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


                                            {/* STATUS EXPLANATION */}

                                            <div className="user-report-status-note">

                                                <strong>
                                                    {
                                                        report.status
                                                    }
                                                </strong>


                                                <p>

                                                    {
                                                        getStatusMessage(
                                                            report.status
                                                        )
                                                    }

                                                </p>

                                            </div>


                                            {/* REVIEW INFORMATION */}

                                            {report.reviewedAt && (

                                                <div className="user-review-info">

                                                    <span>

                                                        Reviewed
                                                        {" "}
                                                        {
                                                            formatDate(
                                                                report.reviewedAt
                                                            )
                                                        }

                                                    </span>


                                                    {report.reviewedBy && (

                                                        <span>

                                                            by
                                                            {" "}
                                                            {
                                                                report.reviewedBy
                                                            }

                                                        </span>

                                                    )}

                                                </div>

                                            )}

                                        </article>

                                    )
                                )}

                            </div>

                        )}

                </section>


                {/* =========================
                    SAFETY NOTE
                ========================= */}

                <section className="user-safety-note">

                    <div>

                        <p className="eyebrow">
                            SAFETY REMINDER
                        </p>


                        <h2>
                            Do not interact with suspicious content.
                        </h2>

                    </div>


                    <p>

                        Avoid replying, sending money,
                        sharing credentials or opening
                        unknown links while a report is
                        being reviewed.

                    </p>

                </section>


                {/* =========================
                    ACCOUNT
                ========================= */}

                <section className="user-account-strip">

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
                            Account Type
                        </span>


                        <strong>
                            Reporter
                        </strong>

                    </div>

                </section>


            </div>

        </main>

    );

}


export default UserDashboard;