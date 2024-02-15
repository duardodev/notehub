-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "coverImage" TEXT,
    "icon" TEXT,
    "isArchived" BOOLEAN NOT NULL,
    "isPublished" BOOLEAN NOT NULL,
    "parentDocument" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_parentDocument_fkey" FOREIGN KEY ("parentDocument") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
