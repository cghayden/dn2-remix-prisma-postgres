/*
  Warnings:

  - The primary key for the `DanceClass` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `style` on the `DanceClass` table. All the data in the column will be lost.
  - The primary key for the `Dancer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Enrollment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Instructor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Instructor` table. All the data in the column will be lost.
  - The primary key for the `Parent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Parent` table. All the data in the column will be lost.
  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Studio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Studio` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `competitive` to the `DanceClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recital` to the `DanceClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recreational` to the `DanceClass` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "DanceClass" DROP CONSTRAINT "DanceClass_studioId_fkey";

-- DropForeignKey
ALTER TABLE "Dancer" DROP CONSTRAINT "Dancer_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_classId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_dancerId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studioId_fkey";

-- DropForeignKey
ALTER TABLE "Instructor" DROP CONSTRAINT "Instructor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_userId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_classId_fkey";

-- DropForeignKey
ALTER TABLE "Studio" DROP CONSTRAINT "Studio_userId_fkey";

-- DropForeignKey
ALTER TABLE "_DancerToStudio" DROP CONSTRAINT "_DancerToStudio_A_fkey";

-- DropForeignKey
ALTER TABLE "_DancerToStudio" DROP CONSTRAINT "_DancerToStudio_B_fkey";

-- DropForeignKey
ALTER TABLE "_InstructorToStudio" DROP CONSTRAINT "_InstructorToStudio_A_fkey";

-- DropForeignKey
ALTER TABLE "_InstructorToStudio" DROP CONSTRAINT "_InstructorToStudio_B_fkey";

-- DropIndex
DROP INDEX "Instructor_userId_key";

-- DropIndex
DROP INDEX "Parent_userId_key";

-- DropIndex
DROP INDEX "Studio_userId_key";

-- AlterTable
ALTER TABLE "DanceClass" DROP CONSTRAINT "DanceClass_pkey",
DROP COLUMN "style",
ADD COLUMN     "competitive" BOOLEAN NOT NULL,
ADD COLUMN     "levelId" TEXT,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "performanceName" TEXT,
ADD COLUMN     "recital" BOOLEAN NOT NULL,
ADD COLUMN     "recreational" BOOLEAN NOT NULL,
ADD COLUMN     "styleOfDance" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "studioId" DROP NOT NULL,
ALTER COLUMN "studioId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DanceClass_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DanceClass_id_seq";

-- AlterTable
ALTER TABLE "Dancer" DROP CONSTRAINT "Dancer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "birthdate" DROP NOT NULL,
ALTER COLUMN "parentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Dancer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Dancer_id_seq";

-- AlterTable
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "dancerId" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ALTER COLUMN "studioId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Enrollment_id_seq";

-- AlterTable
ALTER TABLE "Instructor" DROP CONSTRAINT "Instructor_pkey",
DROP COLUMN "id",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Instructor_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_pkey",
DROP COLUMN "id",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Parent_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ALTER COLUMN "dayOfWeek" DROP DEFAULT,
ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Schedule_id_seq";

-- AlterTable
ALTER TABLE "Studio" DROP CONSTRAINT "Studio_pkey",
DROP COLUMN "id",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Studio_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "_DancerToStudio" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_InstructorToStudio" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "DanceLevel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "studioId" TEXT NOT NULL,

    CONSTRAINT "DanceLevel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dancer" ADD CONSTRAINT "Dancer_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Studio" ADD CONSTRAINT "Studio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "Dancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DanceClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "DanceLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceLevel" ADD CONSTRAINT "DanceLevel_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DanceClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DancerToStudio" ADD CONSTRAINT "_DancerToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Dancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DancerToStudio" ADD CONSTRAINT "_DancerToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorToStudio" ADD CONSTRAINT "_InstructorToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Instructor"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorToStudio" ADD CONSTRAINT "_InstructorToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
