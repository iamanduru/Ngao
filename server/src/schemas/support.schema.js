import {
    z
} from "zod";


export const supportSchema =
    z.object({

        name:
            z
                .string()
                .trim()
                .min(
                    2,
                    "Please enter your name."
                )
                .max(
                    60,
                    "Name cannot exceed 60 characters."
                ),


        email:
            z
                .string()
                .trim()
                .email(
                    "Enter a valid email address."
                )
                .transform(
                    (value) =>
                        value.toLowerCase()
                ),


        subject:
            z.enum([
                "General Question",
                "Technical Support",
                "Account Access",
                "Safety Guidance",
                "Other"
            ]),


        message:
            z
                .string()
                .trim()
                .min(
                    20,
                    "Please provide at least 20 characters."
                )
                .max(
                    1000,
                    "Message cannot exceed 1000 characters."
                )

    })

    .superRefine(
        (data, ctx) => {

            const sensitivePatterns = [

                /\b(?:otp|pin|security code)\s*(?:is|was|:|-)?\s*\d{4,8}\b/i,

                /\bpassword\s*(?:is|was|:|-)\s*\S+/i

            ];


            const containsSensitiveData =
                sensitivePatterns.some(
                    (pattern) =>
                        pattern.test(
                            data.message
                        )
                );


            if (
                containsSensitiveData
            ) {

                ctx.addIssue({

                    code:
                        z.ZodIssueCode.custom,

                    path:
                        ["message"],

                    message:
                        "Do not include passwords, PINs, OTPs or security codes."

                });

            }

        }
    );