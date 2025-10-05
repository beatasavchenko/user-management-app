import CreateUserForm from "../components/forms/create-user-form";
import PageLayout from "../components/page-layout";
import PageHeader from "../components/page-header";

export default function CreateUserPage() {
    return (
        <PageLayout>
            <PageHeader>
                <h2>Create a User</h2>
            </PageHeader>
            <CreateUserForm />
        </PageLayout>
    );
}
