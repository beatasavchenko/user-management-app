import { z } from "zod";
import {
    useEditUserMutation,
    useGetUserByCustomerNumberQuery,
} from "../../features/users/user-api-slice";
import toast from "react-hot-toast";
import Form from "./form";
import { editUserSchema } from "../../schemas/userSchema";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type UserFormData = z.infer<typeof editUserSchema>;

export default function EditUserForm({
    customerNumber,
}: {
    customerNumber: string;
}) {
    const navigate = useNavigate();
    const [editUser] = useEditUserMutation();

    const { data: userData } = useGetUserByCustomerNumberQuery({
        customerNumber,
    });

    const handleEdit = async (data: UserFormData) => {
        try {
            await editUser({
                originalCustomerNumber: customerNumber,
                data,
            }).unwrap();
            toast.success("User edited successfully");
            navigate("/");
        } catch (err: any) {
            if (err?.data?.field) {
                return { [err.data.field]: err.data.message };
            }
            toast.error("Error editing user");
            return;
        }
    };

    return (
        <div>
            {userData ? (
                <Form<UserFormData>
                    schema={editUserSchema}
                    initialValues={{
                        customerNumber: userData.customerNumber,
                        username: userData.username,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        dateOfBirth: dayjs(userData.dateOfBirth).format(
                            "YYYY-MM-DD"
                        ),
                        lastLogin: dayjs(userData.lastLogin).format(
                            "DD.MM.YYYY HH:mm:ss"
                        ),
                    }}
                    readOnlyFields={["username", "lastLogin"]}
                    onSubmit={handleEdit}
                    fields={[
                        { key: "customerNumber", label: "Customer Number" },
                        { key: "username", label: "Username" },
                        { key: "firstName", label: "First Name" },
                        { key: "lastName", label: "Last Name" },
                        { key: "email", label: "Email", type: "email" },
                        {
                            key: "dateOfBirth",
                            label: "Date of Birth",
                            type: "date",
                        },
                        {
                            key: "lastLogin",
                            label: "Last Login",
                            type: "date",
                        },
                        {
                            key: "password",
                            label: "Password",
                            type: "password",
                        },
                        {
                            key: "repeatPassword",
                            label: "Repeat Password",
                            type: "password",
                        },
                    ]}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
