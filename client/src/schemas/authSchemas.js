import { z } from "zod";


/* User Registration*/

export const registerSchema = z
    .object({

        name: z
            .string()
            .trim()
            .min(
                3,
                "Please enter your full name."
            )
            .max(
                60,
                "Name cannot exceed 60 characters."
            ),


        email: z
            .string()
            .trim()
            .email(
                "Enter a valid email address."
            ),


        password: z
            .string()
            .min(
                10,
                "Password must contain at least 10 characters."
            )
            .max(
                128,
                "Password is too long."
            )
            .regex(
                /[a-z]/,
                "Password must contain a lowercase letter."
            )
            .regex(
                /[A-Z]/,
                "Password must contain an uppercase letter."
            )
            .regex(
                /\d/,
                "Password must contain a number."
            ),


        confirmPassword: z
            .string()
            .min(
                1,
                "Please confirm your password."
            ),


        agreement: z
            .boolean()
            .refine(
                (value) => value === true,
                {
                    message:
                        "Please confirm that you understand Ngao is currently a prototype."
                }
            )

    })

    .refine(
        (data) =>
            data.password ===
            data.confirmPassword,
        {
            message:
                "Passwords do not match.",

            path:
                ["confirmPassword"]
        }
    );



/* =========================================
   USER LOGIN
========================================= */

export const loginSchema = z.object({

    email: z
        .string()
        .trim()
        .email(
            "Enter a valid email address."
        ),


    password: z
        .string()
        .min(
            1,
            "Enter your password."
        )

});