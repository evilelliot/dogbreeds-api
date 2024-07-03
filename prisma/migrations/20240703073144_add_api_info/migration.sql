-- CreateTable
CREATE TABLE "API_Info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "madeby" TEXT NOT NULL,
    "madein" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "runningsince" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dedicatedto" TEXT NOT NULL,
    "swagger" BOOLEAN NOT NULL,
    "swagger_url" TEXT NOT NULL,

    CONSTRAINT "API_Info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "API_Info_dedicatedto_key" ON "API_Info"("dedicatedto");
