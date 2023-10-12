/*
  Warnings:

  - You are about to drop the column `email` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Studio` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Studio` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Studio` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Studio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Studio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studioId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Studio` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PARENT', 'STUDIO', 'INSTRUCTOR');

-- DropIndex
DROP INDEX "Parent_email_key";

-- DropIndex
DROP INDEX "Studio_email_key";

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "approved" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "requested" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "studioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "email",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Studio" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DancerToStudio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InstructorToStudio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_userId_key" ON "Instructor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_DancerToStudio_AB_unique" ON "_DancerToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_DancerToStudio_B_index" ON "_DancerToStudio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InstructorToStudio_AB_unique" ON "_InstructorToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_InstructorToStudio_B_index" ON "_InstructorToStudio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_userId_key" ON "Studio"("userId");

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Studio" ADD CONSTRAINT "Studio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DancerToStudio" ADD CONSTRAINT "_DancerToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Dancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DancerToStudio" ADD CONSTRAINT "_DancerToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorToStudio" ADD CONSTRAINT "_InstructorToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorToStudio" ADD CONSTRAINT "_InstructorToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
