import SearchBar from "./search-bar";
import { UserTable } from "./user-table";
import CreateUserButton from "./create-user-button";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function UserPage() {
    const [search, setSearch] = useState("");

    return (
        <div id="user-page">
            <div id="top-bar">
                <SearchBar search={search} setSearch={setSearch} />
                <CreateUserButton />
            </div>
            <UserTable search={search} />
            <Toaster position="bottom-right" />
        </div>
    );
}
