import { useParams } from "react-router-dom";
import EditUserForm from "../components/forms/edit-user-form";
import PageLayout from "../components/page-layout";

export default function EditUserPage() {
    const { customerNumber } = useParams<{ customerNumber: string }>();

    return (
        <PageLayout>
            <h2>Edit a User</h2>
            {customerNumber ? (
                <EditUserForm customerNumber={customerNumber} />
            ) : (
                <></>
            )}
        </PageLayout>
    );
}
