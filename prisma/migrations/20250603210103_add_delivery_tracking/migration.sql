-- AlterTable
ALTER TABLE "Capsule" ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "images" TEXT[];

-- CreateTable
CREATE TABLE "DeliveryLog" (
    "id" TEXT NOT NULL,
    "capsuleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "error" TEXT,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeliveryLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeliveryLog_capsuleId_idx" ON "DeliveryLog"("capsuleId");

-- CreateIndex
CREATE INDEX "DeliveryLog_attemptedAt_idx" ON "DeliveryLog"("attemptedAt");

-- CreateIndex
CREATE INDEX "Capsule_deliveryDate_status_idx" ON "Capsule"("deliveryDate", "status");
