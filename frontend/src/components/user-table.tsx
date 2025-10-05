import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faSort,
    faSortDown,
    faSortUp,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
    useDeleteUserMutation,
    useGetUsersQuery,
} from "../features/users/user-api-slice";
import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SORTABLE_COLUMNS: {
    key: "customerNumber" | "username" | "firstName" | "lastName" | "lastLogin";
    label: string;
}[] = [
    { key: "customerNumber", label: "Customer Number" },
    { key: "username", label: "Username" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "lastLogin", label: "Last Login" },
];

export const UserTable = ({ search }: { search: string }) => {
    const navigate = useNavigate();
    const [sortColumn, setSortColumn] = useState<
        "customerNumber" | "username" | "firstName" | "lastName" | "lastLogin"
    >();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">();

    const { data: userData } = useGetUsersQuery({
        search,
        sortBy: sortColumn,
        order: sortOrder,
    });

    const handleSort = (
        column:
            | "customerNumber"
            | "username"
            | "firstName"
            | "lastName"
            | "lastLogin"
    ) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const [deleteUserMutation] = useDeleteUserMutation();

    const handleEditClick = (customerNumber: string) => {
        navigate(`/edit/${customerNumber}`);
    };

    return (
        <div className="table-container">
            {userData?.length && userData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {SORTABLE_COLUMNS.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => handleSort(col.key)}
                                    style={{
                                        cursor: "pointer",
                                        userSelect: "none",
                                    }}
                                >
                                    {col.label}{" "}
                                    <FontAwesomeIcon
                                        icon={
                                            sortColumn === col.key
                                                ? sortOrder === "asc"
                                                    ? faSortUp
                                                    : faSortDown
                                                : faSort
                                        }
                                    />
                                </th>
                            ))}
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => (
                            <tr key={user.username}>
                                <td>{user.customerNumber}</td>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>
                                    {dayjs(user.lastLogin).format(
                                        "DD.MM.YYYY HH:mm:ss"
                                    )}
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faEdit}
                                        onClick={() =>
                                            handleEditClick(user.customerNumber)
                                        }
                                    />{" "}
                                    <FontAwesomeIcon
                                        className="icon"
                                        id="trash-icon"
                                        onClick={async () => {
                                            await deleteUserMutation({
                                                customerNumber:
                                                    user.customerNumber,
                                            })
                                                .unwrap()
                                                .then(() => {
                                                    toast.success(
                                                        "User deleted successfully"
                                                    );
                                                })
                                                .catch(() => {
                                                    toast.error(
                                                        "Error deleting user"
                                                    );
                                                });
                                        }}
                                        icon={faTrash}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <></>
            )}
        </div>
    );
};
