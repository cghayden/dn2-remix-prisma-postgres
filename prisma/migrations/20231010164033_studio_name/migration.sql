/*
  Warnings:

  - Added the required column `name` to the `Studio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Studio" ADD COLUMN     "name" TEXT NOT NULL;
