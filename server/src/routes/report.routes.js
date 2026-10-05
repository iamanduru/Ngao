import {
    Router
} from "express";


import {
    randomUUID
} from "node:crypto";


import {
    requireRole
} from "../middleware/auth.middleware.js";


import {
    createReport,
    getAllReports,
    getReportsByUserId,
    findReportById,
    updateReportStatus
} from "../store/report.store.js";


import {
    createReportSchema,
    updateStatusSchema
} from "../schemas/report.schema.js";


const router =
    Router();



/* =========================================
   CREATE REPORT
   NORMAL USER ONLY
========================================= */

router.post(
    "/",
    requireRole(
        "user"
    ),
    (req, res) => {

        const validation =
            createReportSchema
                .safeParse(
                    req.body
                );


        if (
            !validation.success
        ) {

            return res
                .status(400)
                .json({

                    success:
                        false,

                    message:
                        "Please correct the report information.",

                    errors:
                        validation
                            .error
                            .flatten()
                            .fieldErrors

                });

        }



        const {
            title,
            category,
            platform,
            sender,
            suspiciousLink,
            description,
            warningSigns
        } = validation.data;



        /*
            IMPORTANT:

            We do not accept userId,
            userName or email from
            the browser.

            The authenticated identity
            comes from the session.
        */

        const report = {

            id:
                `RPT-${randomUUID()
                    .split("-")[0]
                    .toUpperCase()}`,


            userId:
                req.session.user.id,


            submittedBy: {

                name:
                    req.session.user.name,

                email:
                    req.session.user.email

            },


            title,

            category,

            platform,

            sender,

            suspiciousLink,

            description,

            warningSigns,


            status:
                "Pending",


            submittedAt:
                new Date()
                    .toISOString(),


            reviewedAt:
                null,


            reviewedBy:
                null

        };



        createReport(
            report
        );


        return res
            .status(201)
            .json({

                success:
                    true,

                message:
                    "Report submitted successfully.",

                report: {

                    id:
                        report.id,

                    title:
                        report.title,

                    status:
                        report.status,

                    submittedAt:
                        report.submittedAt

                }

            });

    }
);



/* =========================================
   CURRENT USER'S REPORTS
========================================= */

router.get(
    "/mine",
    requireRole(
        "user"
    ),
    (req, res) => {

        const reports =
            getReportsByUserId(
                req.session.user.id
            );


        return res
            .status(200)
            .json({

                success:
                    true,

                reports

            });

    }
);



/* =========================================
   GET ALL REPORTS
   ANALYST ONLY
========================================= */

router.get(
    "/",
    requireRole(
        "analyst"
    ),
    (req, res) => {

        const reports =
            getAllReports();


        return res
            .status(200)
            .json({

                success:
                    true,

                reports

            });

    }
);



/* =========================================
   GET SINGLE REPORT
   ANALYST ONLY
========================================= */

router.get(
    "/:reportId",
    requireRole(
        "analyst"
    ),
    (req, res) => {

        const report =
            findReportById(
                req.params.reportId
            );


        if (!report) {

            return res
                .status(404)
                .json({

                    success:
                        false,

                    message:
                        "Report not found."

                });

        }


        return res
            .status(200)
            .json({

                success:
                    true,

                report

            });

    }
);



/* =========================================
   UPDATE REPORT STATUS
   ANALYST ONLY
========================================= */

router.patch(
    "/:reportId/status",
    requireRole(
        "analyst"
    ),
    (req, res) => {

        const validation =
            updateStatusSchema
                .safeParse(
                    req.body
                );


        if (
            !validation.success
        ) {

            return res
                .status(400)
                .json({

                    success:
                        false,

                    message:
                        "Invalid report status."

                });

        }



        const report =
            updateReportStatus(

                req.params.reportId,

                validation.data.status,

                req.session.user.name

            );


        if (!report) {

            return res
                .status(404)
                .json({

                    success:
                        false,

                    message:
                        "Report not found."

                });

        }


        return res
            .status(200)
            .json({

                success:
                    true,

                message:
                    "Report status updated.",

                report

            });

    }
);


export default router;