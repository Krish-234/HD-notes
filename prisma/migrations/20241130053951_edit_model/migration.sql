/*
  Warnings:

  - Added the required column `editedAt` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "editedAt" TIMESTAMP(3) NOT NULL;
