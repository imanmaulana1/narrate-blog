/*
  Warnings:

  - You are about to drop the `CategoryPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoryPost" DROP CONSTRAINT "CategoryPost_category_id_fkey";

-- DropForeignKey
ALTER TABLE "CategoryPost" DROP CONSTRAINT "CategoryPost_post_id_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "category_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "CategoryPost";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
