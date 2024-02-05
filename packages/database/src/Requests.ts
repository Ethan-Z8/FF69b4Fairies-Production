import { PrismaClient, Progress } from "../.prisma/client";

const prisma = new PrismaClient();

export async function insertServiceRequest(
  typeService: string,
  reason: string,
  nodeLoc: string,
  progress: Progress,
  emp: {
    connect: {
      displayName: string;
    };
  },
) {
  try {
    const result = await prisma.serviceRequest.create({
      data: {
        typeService,
        reason,
        nodeLoc,
        progress,
        emp,
      },
    });

    console.log("ServiceRequest created:", result);
  } catch (error) {
    console.error("Error creating ServiceRequest:", error);
  } finally {
    await prisma.$disconnect();
  }
}
