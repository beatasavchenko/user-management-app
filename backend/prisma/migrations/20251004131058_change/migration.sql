/*
  Warnings:

  - A unique constraint covering the columns `[customer_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_customer_number_key" ON "User"("customer_number");
