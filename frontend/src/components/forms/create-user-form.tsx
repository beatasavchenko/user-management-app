import { z } from "zod";
import { useAddUserMutation } from "../../features/users/user-api-slice";
import toast from "react-hot-toast";
import Form from "./form";
import { userSchema } from "../../schemas/userSchema";
import { useNavigate } from "react-router-dom";

type UserFormData = z.infer<typeof userSchema>;

export default function CreateUserForm() {
    const [createUser] = useAddUserMutation();
    const navigate = useNavigate();

    const handleCreate = async (data: UserFormData) => {
        try {
            await createUser(data).unwrap();
            toast.success("User created successfully");
            navigate("/");
        } catch (err: any) {
            if (err?.data?.field) {
                return { [err.data.field]: err.data.message };
            }
            toast.error("Error creating user");
            return;
        }
    };

    return (
        <Form<UserFormData>
            schema={userSchema}
            initialValues={{
                customerNumber: "",
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                dateOfBirth: "",
                password: "",
                repeatPassword: "",
            }}
            onSubmit={handleCreate}
            fields={[
                { key: "customerNumber", label: "Customer Number" },
                { key: "username", label: "Username" },
                { key: "firstName", label: "First Name" },
                { key: "lastName", label: "Last Name" },
                { key: "email", label: "Email", type: "email" },
                { key: "dateOfBirth", label: "Date of Birth", type: "date" },
                { key: "password", label: "Password", type: "password" },
                {
                    key: "repeatPassword",
                    label: "Repeat Password",
                    type: "password",
                },
            ]}
        />
    );
}
