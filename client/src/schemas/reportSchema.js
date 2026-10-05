import {
    z
} from "zod";


export const reportSchema =
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
            z
                .string()
                .min(
                    1,
                    "Please select a scam category."
                ),


        platform:
            z
                .string()
                .min(
                    1,
                    "Please select where you received the suspicious content."
                ),


        sender:
            z
                .string()
                .trim()
                .max(
                    100,
                    "Sender information is too long."
                )
                .optional(),


        suspiciousLink:
            z
                .string()
                .trim()
                .optional()
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
                            "Enter a valid URL beginning with http:// or https://"
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
                    z.string()
                )
                .default([])

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
                            data.description
                        )
                );


            if (
                containsSensitiveInformation
            ) {

                ctx.addIssue({

                    code:
                        z.ZodIssueCode.custom,

                    path:
                        ["description"],

                    message:
                        "Your description may contain a PIN, OTP, password or security code. Remove sensitive information before submitting."

                });

            }

        }
    );