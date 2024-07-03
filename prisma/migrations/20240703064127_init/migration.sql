-- CreateTable
CREATE TABLE "Dog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "fci_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "pdf_url" TEXT NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dog_fci_url_key" ON "Dog"("fci_url");
