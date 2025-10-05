import { userSchema as baseUserSchema } from "@shared/schemas/userSchema";
import { editUserSchema as baseEditUserSchema } from "@shared/schemas/userSchema";
import z from "zod";

export const userSchema = baseUserSchema
    .extend({
        repeatPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long.")
            .max(150, "Password must be at most 150 characters long."),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords must match",
        path: ["repeatPassword"],
    });

export const editUserSchema = baseEditUserSchema
    .extend({
        repeatPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long.")
            .max(150, "Password must be at most 150 characters long.")
            .optional(),
    })
    .refine(
        (data) => {
            if (!data.password) return true;
            return data.password === data.repeatPassword;
        },
        {
            message: "Passwords must match",
            path: ["repeatPassword"],
        }
    );
