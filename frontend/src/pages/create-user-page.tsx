import CreateUserForm from "../components/forms/create-user-form";
import PageLayout from "../components/page-layout";

export default function CreateUserPage() {
    return (
        <PageLayout>
            <h2>Create a User</h2>
            <CreateUserForm />
        </PageLayout>
    );
}
