import z from "zod";

export const userSchema = z.object({
    customerNumber: z
        .string()
        .regex(/^\d{5}$/, "Customer Number must be exactly 5 digits long."),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters long.")
        .max(30, "Username must be at most 30 characters long.")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters and numbers."
        ),
    firstName: z
        .string()
        .min(2, "First Name must be at least 2 characters long.")
        .max(150, "First Name must be at most 150 characters long."),
    lastName: z
        .string()
        .min(2, "Last Name must be at least 2 characters long.")
        .max(150, "Last Name must be at most 150 characters long."),
    email: z
        .email("Invalid email address.")
        .max(300, "Email must be at most 300 characters long."),
    dateOfBirth: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date.",
        })
        .refine(
            (val) => {
                const date = new Date(val);
                const now = new Date();
                return date < now;
            },
            {
                message: "Date of birth can't be in the future.",
            }
        ),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .max(150, "Password must be at most 150 characters long."),
});

export const editUserSchema = userSchema.extend({
    customerNumber: userSchema.shape.customerNumber.optional(),
    firstName: userSchema.shape.firstName.optional(),
    lastName: userSchema.shape.lastName.optional(),
    email: userSchema.shape.email.optional(),
    dateOfBirth: userSchema.shape.dateOfBirth.optional(),
    lastLogin: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date.",
        })
        .refine(
            (val) => {
                const date = new Date(val);
                const now = new Date();
                return date < now;
            },
            {
                message: "Last login can't be in the future.",
            }
        ),
    password: userSchema.shape.password.optional(),
});
