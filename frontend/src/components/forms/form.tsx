import { ZodError, type ZodSchema } from "zod";
import { useState } from "react";
import dayjs from "dayjs";

type FormProps<T extends Record<string, any>> = {
    schema: ZodSchema<T>;
    initialValues: T;
    fields: {
        key: keyof T;
        label: string;
        type?: "text" | "password" | "email" | "date" | "number";
        placeholder?: string;
    }[];
    readOnlyFields?: string[];
    onSubmit: (data: T) => Promise<Partial<Record<keyof T, string>> | void>;
};

export default function Form<T extends Record<string, any>>({
    schema,
    initialValues,
    fields,
    readOnlyFields,
    onSubmit,
}: FormProps<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = schema.safeParse(values);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof T, string>> = {};
            (result.error as ZodError<T>).issues.forEach((issue) => {
                const field = issue.path[0] as keyof T;
                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        const backendErrors = await onSubmit(result.data);
        if (backendErrors) setErrors(backendErrors);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(({ key, label, type = "text", placeholder }) => (
                <div key={String(key)} className="form-input">
                    <label htmlFor={String(key)}>{label}</label>
                    {readOnlyFields?.includes(String(key)) ? (
                        <div>{values[key]}</div>
                    ) : (
                        <input
                            id={String(key)}
                            type={type}
                            value={values[key] as any}
                            max={
                                type === "date"
                                    ? dayjs().format("YYYY-MM-DD")
                                    : undefined
                            }
                            onChange={handleChange}
                            placeholder={placeholder}
                        />
                    )}
                    <p className="error">{errors[key] && errors[key]}</p>
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}
