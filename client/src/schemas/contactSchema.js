import {
    z
} from "zod";


export const contactSchema =
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
                ),


        subject:
            z
                .string()
                .min(
                    1,
                    "Please select a subject."
                ),


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


            const containsSensitiveInformation =
                sensitivePatterns.some(
                    (pattern) =>
                        pattern.test(
                            data.message
                        )
                );


            if (
                containsSensitiveInformation
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