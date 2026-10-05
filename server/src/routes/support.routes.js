import {
    Router
} from "express";


import {
    randomUUID
} from "node:crypto";


import rateLimit
    from "express-rate-limit";


import {
    supportSchema
} from "../schemas/support.schema.js";


import {
    createSupportRequest
} from "../store/support.store.js";


const router =
    Router();


const supportLimiter =
    rateLimit({

        windowMs:
            15 * 60 * 1000,

        limit:
            5,

        standardHeaders:
            "draft-7",

        legacyHeaders:
            false,

        message: {

            success:
                false,

            message:
                "Too many support requests. Please try again later."

        }

    });



router.post(
    "/",
    supportLimiter,
    (req, res) => {

        const validation =
            supportSchema.safeParse(
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
                        "Please correct the information provided.",

                    errors:
                        validation
                            .error
                            .flatten()
                            .fieldErrors

                });

        }


        const {
            name,
            email,
            subject,
            message
        } = validation.data;


        const supportRequest = {

            id:
                `SUP-${randomUUID()
                    .split("-")[0]
                    .toUpperCase()}`,

            name,

            email,

            subject,

            message,

            submittedAt:
                new Date()
                    .toISOString()

        };


        createSupportRequest(
            supportRequest
        );


        return res
            .status(201)
            .json({

                success:
                    true,

                message:
                    "Your message has been received.",

                reference:
                    supportRequest.id

            });

    }
);


export default router;