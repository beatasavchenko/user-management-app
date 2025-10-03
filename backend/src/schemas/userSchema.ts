import z from "zod";

export const userSchema = z.object({
  customerNumber: z
    .string()
    .length(5, "Customer number must be 5 characters long."),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username must be at most 30 characters long.")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters and numbers."),
  firstName: z
    .string()
    .min(2, "First Name must be at least 2 characters long.")
    .max(150, "First Name must be at most 150 characters long."),
  lastName: z
    .string()
    .min(2, "Last Name must be at least 2 characters long.")
    .max(150, "Last Name must be at most 150 characters long."),
  email: z
    .string()
    .max(300, "Email must be at most 300 characters long.")
    .email("Invalid email address."),
  dateOfBirth: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(150, "Password must be at most 150 characters long.")
});
