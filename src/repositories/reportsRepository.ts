import { prisma } from "../config/database";
import { Reports } from "services/reportsService";

type ReportsOmit = Omit<Reports, "trainingId">;

async function createReports({ userId, exercises }: ReportsOmit) {
  return await prisma.reports.createMany({
    data: exercises.map((e) => ({
      userId: userId,
      exerciseId: e.exerciseId,
      averageReps: e.averageReps,
    })),
  });
}

export default {
  createReports,
};
