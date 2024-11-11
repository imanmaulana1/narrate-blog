/*
  Warnings:

  - A unique constraint covering the columns `[post_id,user_id]` on the table `PostLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PostLike_post_id_user_id_key" ON "PostLike"("post_id", "user_id");
