-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "done" BOOLEAN DEFAULT false,
    "content" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
