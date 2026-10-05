import express from "express";

import helmet from "helmet";

import cors from "cors";

import cookieParser from "cookie-parser";

import session from "express-session";

import rateLimit from "express-rate-limit";


import healthRouter
    from "./routes/health.routes.js";


import authRouter
    from "./routes/auth.routes.js";


import reportRouter
    from "./routes/report.routes.js";

import supportRouter
    from "./routes/support.routes.js";

const app =
    express();



/* =========================================
   SECURITY HEADERS
========================================= */

app.use(
    helmet()
);



/* =========================================
   CORS
========================================= */

app.use(
    cors({

        origin:
            process.env.CLIENT_ORIGIN,

        credentials:
            true

    })
);



/* =========================================
   JSON BODY PARSING
========================================= */

app.use(
    express.json({

        limit:
            "100kb"

    })
);



/* =========================================
   COOKIE PARSER
========================================= */

app.use(
    cookieParser()
);



/* =========================================
   SESSION
========================================= */

app.use(
    session({

        name:
            "ngao.sid",

        secret:
            process.env.SESSION_SECRET,

        resave:
            false,

        saveUninitialized:
            false,

        cookie: {

            httpOnly:
                true,

            secure:
                false,

            sameSite:
                "lax",

            maxAge:
                1000 *
                60 *
                60

        }

    })
);



/* =========================================
   GENERAL API RATE LIMIT
========================================= */

const apiLimiter =
    rateLimit({

        windowMs:
            15 *
            60 *
            1000,

        limit:
            200,

        standardHeaders:
            "draft-7",

        legacyHeaders:
            false,

        message: {

            success:
                false,

            message:
                "Too many requests. Please try again later."

        }

    });


app.use(
    "/api",
    apiLimiter
);



/* =========================================
   API ROUTES
========================================= */

app.use(
    "/api/health",
    healthRouter
);


app.use(
    "/api/auth",
    authRouter
);


app.use(
    "/api/reports",
    reportRouter
);

app.use(
    "/api/support",
    supportRouter
);

/* =========================================
   API 404
========================================= */

app.use(
    "/api",
    (req, res) => {

        return res
            .status(404)
            .json({

                success:
                    false,

                message:
                    "API endpoint not found."

            });

    }
);



/* =========================================
   ERROR HANDLER
========================================= */

app.use(
    (
        err,
        req,
        res,
        next
    ) => {

        /*
            Request body exceeded
            express.json() limit.
        */

        if (
            err.type ===
                "entity.too.large" ||
            err.status === 413
        ) {

            return res
                .status(413)
                .json({

                    success:
                        false,

                    message:
                        "Request payload is too large."

                });

        }



        /*
            Invalid / malformed JSON.
        */

        if (
            err instanceof SyntaxError &&
            err.status === 400 &&
            "body" in err
        ) {

            return res
                .status(400)
                .json({

                    success:
                        false,

                    message:
                        "Invalid JSON request body."

                });

        }



        /*
            Unexpected server error.

            We log only the error message
            during development — never
            credentials or request bodies.
        */

        console.error(
            "Server error:",
            err.message
        );


        return res
            .status(500)
            .json({

                success:
                    false,

                message:
                    "An unexpected server error occurred."

            });

    }
);


export default app;