import { PrismaClient } from "../.prisma/client";

const prisma = new PrismaClient();

export async function insertServiceRequest(
  typeService: string,
  reason: string,
  nodeLoc: string,
) {
  try {
    const result = await prisma.serviceRequest.create({
      data: {
        typeService,
        reason,
        nodeLoc,
      },
    });

    console.log("ServiceRequest created:", result);
  } catch (error) {
    console.error("Error creating ServiceRequest:", error);
  } finally {
    await prisma.$disconnect();
  }
}
