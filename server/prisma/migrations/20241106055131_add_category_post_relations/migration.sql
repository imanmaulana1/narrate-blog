-- CreateTable
CREATE TABLE "CategoryPost" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoryPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryPost" ADD CONSTRAINT "CategoryPost_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryPost" ADD CONSTRAINT "CategoryPost_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
