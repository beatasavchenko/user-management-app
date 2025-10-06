import { useParams } from "react-router-dom";
import EditUserForm from "../components/forms/edit-user-form";
import PageLayout from "../components/page-layout";
import PageHeader from "../components/page-header";

export default function EditUserPage() {
    const { customerNumber } = useParams<{ customerNumber: string }>();

    return (
        <PageLayout>
            <PageHeader>
                <h2>Edit a User</h2>
            </PageHeader>
            {customerNumber && <EditUserForm customerNumber={customerNumber} />}
        </PageLayout>
    );
}
