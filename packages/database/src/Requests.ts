import { PrismaClient } from "../.prisma/client";

const prisma = new PrismaClient();

export async function insertServiceRequest(id: number, name: string) {
  try {
    const result = await prisma.serviceRequest.create({
      data: {
        id,
        name,
      },
    });

    console.log("ServiceRequest created:", result);
  } catch (error) {
    console.error("Error creating ServiceRequest:", error);
  } finally {
    await prisma.$disconnect();
  }
}
