import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../types/User.type";
import dayjs from "dayjs";
import { userSchema } from "../schemas/userSchema";

const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const createUser = async (userToCreate: CreateUserDto) => {
  const parsed = userSchema.safeParse(userToCreate);
  if (!parsed.success)
    throw new Error(
      "Validation failed: " + JSON.stringify(parsed.error.issues)
    );

  return await prisma.user.create({
    data: {
      ...userToCreate,
      customer_number: userToCreate.customerNumber,
      first_name: userToCreate.firstName,
      last_name: userToCreate.lastName,
      last_login: new Date(),
      date_of_birth: userToCreate.dateOfBirth
    }
  });
};

export { getAllUsers, createUser };
