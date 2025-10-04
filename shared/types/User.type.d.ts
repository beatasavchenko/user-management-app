interface User {
    customerNumber: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    lastLogin: Date;
}

interface CreateUserDto extends Omit<User, "lastLogin"> {
    dateOfBirth: string;
    password: string;
}

export type { User, CreateUserDto };
