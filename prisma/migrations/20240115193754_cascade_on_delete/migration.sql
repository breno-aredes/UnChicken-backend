-- DropForeignKey
ALTER TABLE "exercise" DROP CONSTRAINT "exercise_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
