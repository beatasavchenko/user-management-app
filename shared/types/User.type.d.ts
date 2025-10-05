interface User {
    customerNumber: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    lastLogin: string;
    dateOfBirth: string;
}

interface CreateUserDto extends Omit<User, "lastLogin"> {
    password: string;
}

interface EditUserDto extends Omit<Partial<User>, "lastLogin" | "username"> {
    password: string;
}

export type { User, CreateUserDto, EditUserDto };
