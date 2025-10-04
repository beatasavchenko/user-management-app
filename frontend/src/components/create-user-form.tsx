import { useState } from "react";
import { z, ZodError } from "zod";
import { userSchema } from "@shared/schemas/userSchema";
import { useAddUserMutation } from "../features/users/user-api-slice";
import toast from "react-hot-toast";

const frontendUserSchema = userSchema
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

type UserFormData = z.infer<typeof frontendUserSchema>;

type FieldConfig = {
    type: "text" | "password" | "email" | "date" | "number";
    label?: string;
    placeholder?: string;
};

const fieldConfigs: Record<keyof UserFormData, FieldConfig> = {
    customerNumber: { type: "text", label: "Customer Number" },
    username: { type: "text", label: "Username" },
    firstName: { type: "text", label: "First Name" },
    lastName: { type: "text", label: "Last Name" },
    email: { type: "email", label: "Email" },
    dateOfBirth: { type: "date", label: "Date of Birth" },
    password: { type: "password", label: "Password" },
    repeatPassword: { type: "password", label: "Repeat Password" },
};

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

    const [createUserMutation] = useAddUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = frontendUserSchema.safeParse(values);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof UserFormData, string>> = {};

            (result.error as ZodError<UserFormData>).issues.forEach((issue) => {
                const field = issue.path[0] as keyof UserFormData;
                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);
        } else {
            setErrors({});
            await createUserMutation(values)
                .unwrap()
                .then(() => {
                    toast.success("User created successfully");
                })
                .catch(() => {
                    toast.error("Error creating user");
                });
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
            ).map(([field]) => {
                const config = fieldConfigs[field];

                return (
                    <div className="form-input" key={field}>
                        {config.label && (
                            <label htmlFor={field}>{config.label}</label>
                        )}
                        <input
                            id={field}
                            type={config.type}
                            value={values[field]}
                            onChange={handleChange}
                            placeholder={config.placeholder}
                        />
                        <p className="error">
                            {errors[field] && errors[field]}
                        </p>
                    </div>
                );
            })}

            <button type="submit">Create User</button>
        </form>
    );
}
