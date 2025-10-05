import SearchBar from "../components/search-bar";
import { UserTable } from "../components/user-table";
import CreateUserButton from "../components/create-user-button";
import { useState } from "react";
import PageLayout from "../components/page-layout";

export default function UserPage() {
    const [search, setSearch] = useState("");

    return (
        <PageLayout>
            <div id="top-bar">
                <SearchBar search={search} setSearch={setSearch} />
                <CreateUserButton />
            </div>
            <UserTable search={search} />
        </PageLayout>
    );
}
