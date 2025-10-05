import { PrismaClient } from "@prisma/client";
import { editUserSchema, userSchema } from "@shared/schemas/userSchema";
import { CreateUserDto, EditUserDto } from "@shared/types/User.type";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

const DB_COLUMNS_MAP: Record<string, string> = {
  customerNumber: "customer_number",
  username: "username",
  firstName: "first_name",
  lastName: "last_name",
  email: "email",
  lastLogin: "last_login",
  dateOfBirth: "date_of_birth"
};

type GetAllUsersParams = {
  search?: string;
  sortBy?:
    | "customerNumber"
    | "username"
    | "firstName"
    | "lastName"
    | "lastLogin";
  order?: "asc" | "desc";
};

const getAllUsers = async ({
  search = "",
  sortBy,
  order
}: GetAllUsersParams) => {
  const users = await prisma.user.findMany({
    where: search
      ? {
          OR: [
            {
              customer_number: {
                contains: search,
                mode: "insensitive" as const
              }
            },
            { username: { contains: search, mode: "insensitive" as const } },
            { first_name: { contains: search, mode: "insensitive" as const } },
            { last_name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } }
          ]
        }
      : {},
    ...(sortBy && order
      ? {
          orderBy: {
            [DB_COLUMNS_MAP[sortBy] ?? sortBy]:
              order === "desc" ? "desc" : "asc"
          }
        }
      : {})
  });

  return users;
};

const getUserByCustomerNumber = async (customerNumber: string) => {
  return await prisma.user.findFirst({
    where: { customer_number: customerNumber }
  });
};

const createUser = async (userToCreate: CreateUserDto) => {
  const parsed = userSchema.safeParse(userToCreate);
  if (!parsed.success)
    throw new Error(
      "Validation failed: " + JSON.stringify(parsed.error.issues)
    );

  // validation on the BE side
  const customerNumberExists = await prisma.user.findUnique({
    where: { customer_number: userToCreate.customerNumber }
  });
  if (customerNumberExists)
    throw {
      field: "customerNumber",
      message: "Customer number already exists."
    };

  const usernameExists = await prisma.user.findUnique({
    where: { username: userToCreate.username }
  });
  if (usernameExists)
    throw { field: "username", message: "Username already exists." };

  const emailExists = await prisma.user.findUnique({
    where: { email: userToCreate.email }
  });
  if (emailExists) throw { field: "email", message: "Email already exists." };

  const hashedPassword = await bcrypt.hash(userToCreate.password, SALT_ROUNDS);

  const [day, month, year] = userToCreate.dateOfBirth.split(".");
  const dateOfBirth = new Date(`${year}-${month}-${day}`);

  return await prisma.user.create({
    data: {
      customer_number: userToCreate.customerNumber,
      username: userToCreate.username,
      first_name: userToCreate.firstName,
      last_name: userToCreate.lastName,
      email: userToCreate.email,
      last_login: new Date(),
      date_of_birth: dateOfBirth,
      password: hashedPassword
    }
  });
};

const updateUser = async (customerNumber: string, userToEdit: EditUserDto) => {
  const parsed = editUserSchema.safeParse(userToEdit);
  if (!parsed.success) {
    throw { type: "validation", errors: parsed.error.issues };
  }

  if (userToEdit.customerNumber) {
    const exists = await prisma.user.findFirst({
      where: {
        customer_number: userToEdit.customerNumber,
        NOT: { customer_number: customerNumber }
      }
    });
    if (exists)
      throw {
        field: "customerNumber",
        message: "Customer number already exists."
      };
  }

  if (userToEdit.email) {
    const exists = await prisma.user.findFirst({
      where: {
        email: userToEdit.email,
        NOT: { customer_number: customerNumber }
      }
    });
    if (exists) throw { field: "email", message: "Email already exists." };
  }

  let hashedPassword: string | undefined;
  if (userToEdit.password) {
    hashedPassword = await bcrypt.hash(userToEdit.password, SALT_ROUNDS);
  }

  let dateOfBirth: Date | undefined;
  if (userToEdit.dateOfBirth) {
    const [day, month, year] = userToEdit.dateOfBirth.split(".");
    const parsedDate = new Date(`${year}-${month}-${day}`);
    if (parsedDate > new Date())
      throw new Error("Date of birth can't be in the future");
    dateOfBirth = parsedDate;
  }

  const updateData: Record<string, any> = {};
  if (userToEdit.customerNumber)
    updateData.customer_number = userToEdit.customerNumber;
  if (userToEdit.firstName) updateData.first_name = userToEdit.firstName;
  if (userToEdit.lastName) updateData.last_name = userToEdit.lastName;
  if (userToEdit.email) updateData.email = userToEdit.email;
  if (dateOfBirth) updateData.date_of_birth = dateOfBirth;
  if (hashedPassword) updateData.password = hashedPassword;

  const updatedUser = await prisma.user.update({
    where: { customer_number: customerNumber },
    data: updateData
  });

  return updatedUser;
};

const deleteUserByCustomerNumber = async (
  customerNumber: string
): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: { customer_number: customerNumber }
    });
    return true;
  } catch (error: any) {
    if (error.code === "P2025") {
      return false;
    }

    throw error;
  }
};

export {
  getAllUsers,
  createUser,
  updateUser,
  deleteUserByCustomerNumber,
  getUserByCustomerNumber
};
