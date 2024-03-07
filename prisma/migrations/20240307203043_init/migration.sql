/*
  Warnings:

  - You are about to drop the column `competitive` on the `DanceClass` table. All the data in the column will be lost.
  - You are about to drop the column `footwear` on the `DanceClass` table. All the data in the column will be lost.
  - You are about to drop the column `instructor` on the `DanceClass` table. All the data in the column will be lost.
  - You are about to drop the column `levelId` on the `DanceClass` table. All the data in the column will be lost.
  - You are about to drop the column `recreational` on the `DanceClass` table. All the data in the column will be lost.
  - You are about to drop the column `tights` on the `DanceClass` table. All the data in the column will be lost.
  - You are about to drop the `DanceLevel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ageLevelId` to the `DanceClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillLevelId` to the `DanceClass` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompetitiveLevel" AS ENUM ('RECREATIONAL', 'COMPETITIVE');

-- DropForeignKey
ALTER TABLE "DanceClass" DROP CONSTRAINT "DanceClass_levelId_fkey";

-- DropForeignKey
ALTER TABLE "DanceClass" DROP CONSTRAINT "DanceClass_parentId_fkey";

-- DropForeignKey
ALTER TABLE "DanceClass" DROP CONSTRAINT "DanceClass_studioId_fkey";

-- DropForeignKey
ALTER TABLE "DanceLevel" DROP CONSTRAINT "DanceLevel_studioId_fkey";

-- DropForeignKey
ALTER TABLE "Dancer" DROP CONSTRAINT "Dancer_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_classId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_dancerId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studioId_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_userId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_classId_fkey";

-- DropForeignKey
ALTER TABLE "Studio" DROP CONSTRAINT "Studio_userId_fkey";

-- AlterTable
ALTER TABLE "DanceClass" DROP COLUMN "competitive",
DROP COLUMN "footwear",
DROP COLUMN "instructor",
DROP COLUMN "levelId",
DROP COLUMN "recreational",
DROP COLUMN "tights",
ADD COLUMN     "ageLevelId" TEXT NOT NULL,
ADD COLUMN     "competitions" BOOLEAN,
ADD COLUMN     "footwearId" TEXT,
ADD COLUMN     "instructorId" TEXT,
ADD COLUMN     "skillLevelId" TEXT NOT NULL,
ADD COLUMN     "tightsId" TEXT;

-- AlterTable
ALTER TABLE "Dancer" ADD COLUMN     "imageFilename" TEXT;

-- DropTable
DROP TABLE "DanceLevel";

-- CreateTable
CREATE TABLE "Tights" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "imageFilename" TEXT,
    "studioId" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "Tights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footwear" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "studioId" TEXT NOT NULL,
    "imageFilename" TEXT,
    "color" TEXT,

    CONSTRAINT "Footwear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillLevel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "studioId" TEXT NOT NULL,

    CONSTRAINT "SkillLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgeLevel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "studioId" TEXT NOT NULL,

    CONSTRAINT "AgeLevel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dancer" ADD CONSTRAINT "Dancer_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Studio" ADD CONSTRAINT "Studio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_footwearId_fkey" FOREIGN KEY ("footwearId") REFERENCES "Footwear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_tightsId_fkey" FOREIGN KEY ("tightsId") REFERENCES "Tights"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_ageLevelId_fkey" FOREIGN KEY ("ageLevelId") REFERENCES "AgeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceClass" ADD CONSTRAINT "DanceClass_skillLevelId_fkey" FOREIGN KEY ("skillLevelId") REFERENCES "SkillLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "Dancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DanceClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tights" ADD CONSTRAINT "Tights_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footwear" ADD CONSTRAINT "Footwear_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillLevel" ADD CONSTRAINT "SkillLevel_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgeLevel" ADD CONSTRAINT "AgeLevel_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DanceClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
