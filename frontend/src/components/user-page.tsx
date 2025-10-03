import SearchBar from "./search-bar";
import { UserTable } from "./user-table";
import CreateUserButton from "./create-user-button";

export default function UserPage() {
    return (
        <div id="user-page">
            <div id="top-bar">
                <SearchBar />
                <CreateUserButton />
            </div>
            <UserTable />
        </div>
    );
}
