import { z } from "zod";


export const registerSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Name must contain at least 3 characters.")
        .max(60, "Name cannot exceed 60 characters."),

    email: z
        .string()
        .trim()
        .email("Enter a valid email address.")
        .transform((value) =>
            value.toLowerCase()
        ),

    password: z
        .string()
        .min(10, "Password must contain at least 10 characters.")
        .max(128, "Password is too long.")
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
        )

});


export const loginSchema = z.object({

    email: z
        .string()
        .trim()
        .email("Enter a valid email address.")
        .transform((value) =>
            value.toLowerCase()
        ),

    password: z
        .string()
        .min(1, "Password is required.")
        .max(128, "Password is too long.")

});