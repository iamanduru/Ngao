import {
    z
} from "zod";


const reportCategories = [

    "Phishing",

    "Fake Job Offer",

    "Impersonation",

    "Payment Scam",

    "Prize / Giveaway Scam",

    "Investment Scam",

    "Other"

];


const reportPlatforms = [

    "WhatsApp",

    "Email",

    "SMS",

    "Facebook",

    "Instagram",

    "Website",

    "Other"

];


const warningSignValues = [

    "Requested credentials",

    "Requested payment",

    "Urgent language",

    "Suspicious link",

    "Impersonation"

];



/* Create report */

export const createReportSchema =
    z.object({

        title:
            z
                .string()
                .trim()
                .min(
                    5,
                    "Report title must contain at least 5 characters."
                )
                .max(
                    80,
                    "Report title cannot exceed 80 characters."
                ),


        category:
            z.enum(
                reportCategories
            ),


        platform:
            z.enum(
                reportPlatforms
            ),


        sender:
            z
                .string()
                .trim()
                .max(
                    100,
                    "Sender information is too long."
                )
                .optional()
                .default(""),


        suspiciousLink:
            z
                .string()
                .trim()
                .max(
                    500,
                    "URL is too long."
                )
                .optional()
                .default("")
                .refine(
                    (value) => {

                        if (!value) {
                            return true;
                        }


                        try {

                            const parsedUrl =
                                new URL(
                                    value
                                );


                            return [
                                "http:",
                                "https:"
                            ].includes(
                                parsedUrl.protocol
                            );

                        } catch {

                            return false;

                        }

                    },
                    {
                        message:
                            "Enter a valid HTTP or HTTPS URL."
                    }
                ),


        description:
            z
                .string()
                .trim()
                .min(
                    20,
                    "Please provide at least 20 characters."
                )
                .max(
                    700,
                    "Description cannot exceed 700 characters."
                ),


        warningSigns:
            z
                .array(
                    z.enum(
                        warningSignValues
                    )
                )
                .max(5)
                .default([])

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
                            data.description
                        )
                );


            if (
                containsSensitiveData
            ) {

                ctx.addIssue({

                    code:
                        z.ZodIssueCode.custom,

                    path:
                        ["description"],

                    message:
                        "Remove passwords, PINs, OTPs or security codes before submitting."

                });

            }

        }
    );



/* Update status*/

export const updateStatusSchema =
    z.object({

        status:
            z.enum([
                "Pending",
                "Reviewed",
                "Suspicious"
            ])

    });