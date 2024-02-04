import { PrismaClient } from "../.prisma/client";

const prisma = new PrismaClient();

export async function insertEmployee(
  username: string,
  password: string,
  displayName: string,
) {
  try {
    const result = await prisma.employee.create({
      data: {
        username,
        password,
        displayName,
      },
    });

    console.log("Employee created:", result);
  } catch (error) {
    console.error("Error creating Employee:", error);
  } finally {
    await prisma.$disconnect();
  }
}
