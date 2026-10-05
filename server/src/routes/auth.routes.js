import {
    Router
} from "express";


import bcrypt
    from "bcryptjs";


import rateLimit
    from "express-rate-limit";


import {
    registerSchema,
    loginSchema
} from "../schemas/auth.schema.js";


import {
    createUser,
    findUserByEmail
} from "../store/user.store.js";


const router =
    Router();



/* Auth Rate limit */

const authLimiter =
    rateLimit({

        windowMs:
            15 * 60 * 1000,

        limit:
            10,

        standardHeaders:
            "draft-7",

        legacyHeaders:
            false,

        message: {

            success: false,

            message:
                "Too many authentication attempts. Please try again later."

        }

    });



/* Register User */

router.post(
    "/register",
    authLimiter,
    async (req, res, next) => {

        try {

            const validation =
                registerSchema.safeParse(
                    req.body
                );


            if (!validation.success) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Please correct the information provided.",

                        errors:
                            validation.error.flatten()
                                .fieldErrors

                    });

            }


            const {
                name,
                email,
                password
            } = validation.data;



            const existingUser =
                findUserByEmail(
                    email
                );


            if (existingUser) {

                /*
                    For a real public system, we may
                    eventually use a less revealing
                    response to reduce account enumeration.
                */

                return res
                    .status(409)
                    .json({

                        success: false,

                        message:
                            "An account with this email already exists."

                    });

            }



            const passwordHash =
                await bcrypt.hash(
                    password,
                    12
                );



            const user = {

                id:
                    `USR-${Date.now()}`,

                name,

                email,

                passwordHash,

                role:
                    "user",

                createdAt:
                    new Date()
                        .toISOString()

            };



            createUser(
                user
            );



            return res
                .status(201)
                .json({

                    success: true,

                    message:
                        "Account created successfully."

                });

        } catch (error) {

            next(error);

        }

    }
);



/* login */

router.post(
    "/login",
    authLimiter,
    async (req, res, next) => {

        try {

            const validation =
                loginSchema.safeParse(
                    req.body
                );


            if (!validation.success) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Invalid email or password."

                    });

            }


            const {
                email,
                password
            } = validation.data;



            const user =
                findUserByEmail(
                    email
                );



            if (!user) {

                return res
                    .status(401)
                    .json({

                        success: false,

                        message:
                            "Invalid email or password."

                    });

            }



            const passwordMatches =
                await bcrypt.compare(
                    password,
                    user.passwordHash
                );



            if (!passwordMatches) {

                return res
                    .status(401)
                    .json({

                        success: false,

                        message:
                            "Invalid email or password."

                    });

            }



            /*
                Regenerate the session after login.

                This helps protect against
                session fixation.
            */

            req.session.regenerate(
                (error) => {

                    if (error) {

                        return next(
                            error
                        );

                    }


                    req.session.user = {

                        id:
                            user.id,

                        name:
                            user.name,

                        email:
                            user.email,

                        role:
                            user.role

                    };


                    return res
                        .status(200)
                        .json({

                            success:
                                true,

                            message:
                                "Login successful.",

                            user:
                                req.session.user

                        });

                }
            );

        } catch (error) {

            next(error);

        }

    }
);



/* Current session */

router.get(
    "/me",
    (req, res) => {

        if (!req.session.user) {

            return res
                .status(401)
                .json({

                    success:
                        false,

                    message:
                        "Not authenticated."

                });

        }


        return res
            .status(200)
            .json({

                success:
                    true,

                user:
                    req.session.user

            });

    }
);



/* Logout */

router.post(
    "/logout",
    (req, res, next) => {

        if (!req.session) {

            return res
                .status(204)
                .end();

        }


        req.session.destroy(
            (error) => {

                if (error) {

                    return next(
                        error
                    );

                }


                res.clearCookie(
                    "ngao.sid"
                );


                return res
                    .status(200)
                    .json({

                        success: true,

                        message:
                            "Logged out successfully."

                    });

            }
        );

    }
);


export default router;