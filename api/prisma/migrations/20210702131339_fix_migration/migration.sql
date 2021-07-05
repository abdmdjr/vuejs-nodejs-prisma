/*
  Warnings:

  - You are about to drop the column `todoId` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `tagsId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_todoId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "todoId";

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "tagsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("tagsId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
