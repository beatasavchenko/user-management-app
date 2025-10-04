import { PrismaClient } from "@prisma/client";
import { userSchema } from "@shared/schemas/userSchema";
import { CreateUserDto } from "@shared/types/User.type";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const ALLOWED_SORT_COLUMNS = [
  "customerNumber",
  "username",
  "firstName",
  "lastName",
  "lastLogin"
];

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
  console.log(search, sortBy, order);

  // const column = ALLOWED_SORT_COLUMNS.includes(sortBy)
  //   ? sortBy
  //   : "customerNumber";

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
      ? { orderBy: { [sortBy]: order === "desc" ? "desc" : "asc" } }
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

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(userToCreate.password, saltRounds);

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
  deleteUserByCustomerNumber,
  getUserByCustomerNumber
};
