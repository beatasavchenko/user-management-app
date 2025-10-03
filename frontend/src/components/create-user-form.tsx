import { useState } from "react";
import { z, ZodError } from "zod";

export const userSchema = z
    .object({
        customerNumber: z
            .string()
            .length(5, "Customer number must be 5 characters long."),
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
            .string()
            .max(300, "Email must be at most 300 characters long.")
            .email("Invalid email address."),
        dateOfBirth: z.string(),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long.")
            .max(150, "Password must be at most 150 characters long."),
        repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords must match",
        path: ["repeatPassword"],
    });

type UserFormData = z.infer<typeof userSchema>;

export default function CreateUserForm() {
    const [values, setValues] = useState<UserFormData>({
        customerNumber: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        password: "",
        repeatPassword: "",
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof UserFormData, string>>
    >({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = userSchema.safeParse(values);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof UserFormData, string>> = {};

            (result.error as ZodError<UserFormData>).issues.forEach((issue) => {
                const field = issue.path[0] as keyof UserFormData;
                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);
        } else {
            setErrors({});
            alert("User created successfully!");
            console.log(result.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {(
                [
                    ["customerNumber", "Customer Number"],
                    ["username", "Username"],
                    ["firstName", "First Name"],
                    ["lastName", "Last Name"],
                    ["email", "Email"],
                    ["dateOfBirth", "Date of Birth"],
                    ["password", "Password"],
                    ["repeatPassword", "Repeat Password"],
                ] as const
            ).map(([field, label]) => (
                <div className="form-input" key={field}>
                    <label htmlFor={field}>{label}</label>
                    <input
                        id={field}
                        type={
                            field.toLowerCase().includes("password")
                                ? "password"
                                : "text"
                        }
                        value={values[field]}
                        onChange={handleChange}
                    />
                    <p className="error">{errors[field] && errors[field]}</p>
                </div>
            ))}

            <button type="submit">Create User</button>
        </form>
    );
}
