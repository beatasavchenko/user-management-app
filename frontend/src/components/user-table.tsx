import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export const UserTable = () => {
    const users = [
        {
            customerNumber: "12345",
            username: "user1",
            firstName: "User",
            lastName: "Name",
            email: "username@gmail.comusername@gmail.comusername@gmail.comusername@gmail.comusername@gmail.com",
            lastLogin: "03.10.2025 10:12:11",
        },
        {
            customerNumber: "12345",
            username: "user2",
            firstName: "User",
            lastName: "Name",
            email: "username@gmail.com",
            lastLogin: "03.10.2025 10:12:11",
        },
    ];

    return (
        <div className="user-table-container">
            <table>
                <thead>
                    <tr>
                        <th>Customer Number</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.username}>
                            <td>{user.customerNumber}</td>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.lastLogin}</td>
                            <td>
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faEdit}
                                />{" "}
                                <FontAwesomeIcon
                                    className="icon"
                                    id="trash-icon"
                                    icon={faTrash}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
